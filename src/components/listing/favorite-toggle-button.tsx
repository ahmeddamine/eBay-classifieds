"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export function FavoriteToggleButton({ listingId }: { listingId: string }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    supabase.auth.getUser().then(async ({ data }) => {
      const user = data.user;
      if (!user) return;
      const { data: fav } = await supabase
        .from("favorites")
        .select("listing_id")
        .eq("profile_id", user.id)
        .eq("listing_id", listingId)
        .maybeSingle();
      setIsFavorite(Boolean(fav));
    });
  }, [listingId]);

  async function toggleFavorite() {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      router.push(`/auth/login?next=/listing/${listingId}`);
      return;
    }

    setLoading(true);
    if (isFavorite) {
      await supabase.from("favorites").delete().eq("profile_id", data.user.id).eq("listing_id", listingId);
      setIsFavorite(false);
    } else {
      await supabase.from("favorites").insert({ profile_id: data.user.id, listing_id: listingId });
      setIsFavorite(true);
    }
    setLoading(false);
    router.refresh();
  }

  return (
    <button onClick={toggleFavorite} disabled={loading} className="w-full rounded-lg border border-slate-300 px-3 py-2 font-semibold disabled:opacity-60">
      {isFavorite ? "Remove favorite" : "Save favorite"}
    </button>
  );
}
