"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TopNav } from "@/components/layout/top-nav";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type InboxConversation = {
  id: string;
  listing_id: string;
  buyer_id: string;
  seller_id: string;
  updated_at: string;
  listings: { title: string } | null;
  buyer_profile: { display_name: string } | null;
  seller_profile: { display_name: string } | null;
};

export default function MessagesPage() {
  const [items, setItems] = useState<InboxConversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setError("Supabase environment variables are missing.");
      setLoading(false);
      return;
    }

    supabase.auth.getUser().then(async ({ data }) => {
      const user = data.user;
      if (!user) {
        router.replace("/auth/login?next=/messages");
        return;
      }
      setCurrentUserId(user.id);

      const { data: rows, error: convError } = await supabase
        .from("conversations")
        .select(
          `
          id,listing_id,buyer_id,seller_id,updated_at,
          listings:listing_id(title),
          buyer_profile:buyer_id(display_name),
          seller_profile:seller_id(display_name)
        `
        )
        .order("updated_at", { ascending: false });

      if (convError) {
        setError(convError.message);
      } else {
        setItems((rows ?? []) as unknown as InboxConversation[]);
      }
      setLoading(false);
    });
  }, [router]);

  return (
    <div>
      <TopNav />
      <main className="container-px space-y-4 py-6">
        <h1 className="text-2xl font-bold">Messages</h1>
        {loading && <div className="card p-4 text-sm text-slate-600">Loading conversations…</div>}
        {error && <div className="card p-4 text-sm text-red-600">{error}</div>}

        {!loading && !error && (
          <section className="card divide-y divide-slate-200">
            {items.length === 0 ? (
              <div className="p-6 text-sm text-slate-600">No conversations yet. Open any listing to message a seller.</div>
            ) : (
              items.map((conversation) => {
                const counterpart = conversation.buyer_id === currentUserId
                  ? conversation.seller_profile?.display_name ?? "Seller"
                  : conversation.buyer_profile?.display_name ?? "Buyer";

                return (
                  <Link href={`/messages/${conversation.id}`} key={conversation.id} className="block p-4 hover:bg-slate-50">
                    <p className="font-semibold">{counterpart}</p>
                    <p className="text-sm text-slate-600">{conversation.listings?.title ?? "Listing"}</p>
                    <p className="text-xs text-slate-500">Updated {new Date(conversation.updated_at).toLocaleString()}</p>
                  </Link>
                );
              })
            )}
          </section>
        )}
      </main>
    </div>
  );
}
