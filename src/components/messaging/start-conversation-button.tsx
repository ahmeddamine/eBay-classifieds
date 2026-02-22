"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export function StartConversationButton({ listingId, sellerId }: { listingId: string; sellerId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onClick() {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    const { data } = await supabase.auth.getUser();
    const user = data.user;
    if (!user) {
      router.push(`/auth/login?next=/listing/${listingId}`);
      return;
    }

    if (user.id === sellerId) {
      router.push("/messages");
      return;
    }

    setLoading(true);

    const { data: existing } = await supabase
      .from("conversations")
      .select("id")
      .eq("listing_id", listingId)
      .eq("buyer_id", user.id)
      .eq("seller_id", sellerId)
      .maybeSingle();

    if (existing?.id) {
      setLoading(false);
      router.push(`/messages/${existing.id}`);
      return;
    }

    const { data: created, error } = await supabase
      .from("conversations")
      .insert({ listing_id: listingId, buyer_id: user.id, seller_id: sellerId })
      .select("id")
      .single();

    setLoading(false);

    if (error || !created) {
      router.push("/messages");
      return;
    }

    router.push(`/messages/${created.id}`);
  }

  return (
    <button onClick={onClick} disabled={loading} className="w-full rounded-lg bg-brand-600 px-3 py-2 font-semibold text-white disabled:opacity-60">
      {loading ? "Opening..." : "Message seller"}
    </button>
  );
}
