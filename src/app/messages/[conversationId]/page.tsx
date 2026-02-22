"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { TopNav } from "@/components/layout/top-nav";
import { MessageThread } from "@/components/messaging/message-thread";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type MessageRow = {
  id: string;
  sender_id: string;
  body: string;
  created_at: string;
};

export default function MessageDetailPage() {
  const { conversationId } = useParams<{ conversationId: string }>();
  const router = useRouter();
  const [userId, setUserId] = useState<string>("");
  const [rows, setRows] = useState<MessageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadMessages(currentUserId: string) {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    const { data, error: msgError } = await supabase
      .from("messages")
      .select("id,sender_id,body,created_at")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (msgError) {
      setError(msgError.message);
    } else {
      setRows((data ?? []) as MessageRow[]);
    }

    setLoading(false);
    setUserId(currentUserId);
  }

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setError("Supabase environment variables are missing.");
      setLoading(false);
      return;
    }

    let cancelled = false;
    let channel: ReturnType<typeof supabase.channel> | null = null;

    (async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      if (!user) {
        router.replace(`/auth/login?next=/messages/${conversationId}`);
        return;
      }

      if (cancelled) return;
      await loadMessages(user.id);

      channel = supabase
        .channel(`messages-${conversationId}`)
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${conversationId}` },
          async () => {
            if (!cancelled) await loadMessages(user.id);
          }
        )
        .subscribe();
    })();

    return () => {
      cancelled = true;
      if (channel) supabase.removeChannel(channel);
    };
  }, [conversationId, router]);

  const items = useMemo(
    () =>
      rows.map((row) => ({
        id: row.id,
        sender: row.sender_id === userId ? ("me" as const) : ("them" as const),
        text: row.body,
        sentAt: new Date(row.created_at).toLocaleTimeString()
      })),
    [rows, userId]
  );

  async function onSend(text: string) {
    const supabase = getSupabaseBrowserClient();
    if (!supabase || !userId) return;
    setSending(true);

    const { error: sendError } = await supabase.from("messages").insert({
      conversation_id: conversationId,
      sender_id: userId,
      body: text
    });

    if (sendError) {
      setError(sendError.message);
      setSending(false);
      return;
    }

    await supabase.from("conversations").update({ updated_at: new Date().toISOString() }).eq("id", conversationId);
    await loadMessages(userId);
    setSending(false);
  }

  return (
    <div>
      <TopNav />
      <main className="container-px space-y-4 py-6">
        <h1 className="text-2xl font-bold">Conversation</h1>
        {loading && <div className="card p-4 text-sm text-slate-600">Loading conversation…</div>}
        {error && <div className="card p-4 text-sm text-red-600">{error}</div>}
        {!loading && <MessageThread items={items} onSend={onSend} sending={sending} />}
      </main>
    </div>
  );
}
