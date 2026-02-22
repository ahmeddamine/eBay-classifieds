"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TopNav } from "@/components/layout/top-nav";
import { ListingCard } from "@/components/listing/listing-card";
import { listings as mockListings } from "@/data/mock";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { Listing } from "@/types/marketplace";

type FavoriteRow = {
  listings: {
    id: string;
    title: string;
    price: number;
    city: string;
    condition: Listing["condition"];
    created_at: string;
    description: string;
    category_id: string;
    owner_id: string;
    profiles: { id: string; display_name: string; created_at: string } | null;
    listing_images: Array<{ public_url: string | null; sort_order: number }>;
  } | null;
};

export default function FavoritesPage() {
  const [items, setItems] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setItems(mockListings.slice(0, 2));
      setLoading(false);
      return;
    }

    supabase.auth.getUser().then(async ({ data }) => {
      const user = data.user;
      if (!user) {
        router.replace("/auth/login?next=/favorites");
        return;
      }

      const { data: rows, error: favError } = await supabase
        .from("favorites")
        .select(
          `
          listings:listing_id(
            id,title,price,city,condition,created_at,description,category_id,owner_id,
            profiles:owner_id(id,display_name,created_at),
            listing_images(public_url,sort_order)
          )
        `
        )
        .eq("profile_id", user.id)
        .order("created_at", { ascending: false });

      if (favError) {
        setError(favError.message);
        setLoading(false);
        return;
      }

      const mapped = ((rows ?? []) as unknown as FavoriteRow[])
        .map((row) => row.listings)
        .filter(Boolean)
        .map((row) => {
          const image = [...(row!.listing_images ?? [])].sort((a, b) => a.sort_order - b.sort_order)[0]?.public_url;
          return {
            id: row!.id,
            title: row!.title,
            price: Number(row!.price),
            city: row!.city,
            postedAt: new Date(row!.created_at).toLocaleDateString(),
            imageUrl: image ?? "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",
            condition: row!.condition,
            categorySlug: "other",
            sellerType: "private",
            ships: false,
            seller: {
              id: row!.profiles?.id ?? row!.owner_id,
              name: row!.profiles?.display_name ?? "Seller",
              memberSince: row!.profiles?.created_at ? new Date(row!.profiles.created_at).getFullYear().toString() : "2024",
              listingCount: 1
            },
            description: row!.description,
            attributes: [{ label: "Condition", value: row!.condition.replace("_", " ") }]
          } as Listing;
        });

      setItems(mapped);
      setLoading(false);
    });
  }, [router]);

  return (
    <div>
      <TopNav />
      <main className="container-px space-y-4 py-6">
        <h1 className="text-2xl font-bold">Favorites</h1>
        {loading && <div className="card p-4 text-sm text-slate-600">Loading favorites…</div>}
        {error && <div className="card p-4 text-sm text-red-600">{error}</div>}
        {!loading && !error && items.length === 0 && (
          <div className="card p-6 text-sm text-slate-600">No favorites yet. Save listings to find them quickly.</div>
        )}
        {!loading && !error && items.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
