"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { TopNav } from "@/components/layout/top-nav";
import { ListingForm } from "@/components/sell/listing-form";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { ListingCondition } from "@/types/marketplace";

type EditableListing = {
  id: string;
  title: string;
  description: string;
  price: number;
  city: string;
  condition: ListingCondition;
  category_id: string;
};

export default function EditListingPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [listing, setListing] = useState<EditableListing | null>(null);
  const [categorySlug, setCategorySlug] = useState<string>("electronics");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        router.replace(`/auth/login?next=/sell/${id}/edit`);
        return;
      }

      const { data: row, error: rowError } = await supabase
        .from("listings")
        .select("id,title,description,price,city,condition,category_id")
        .eq("id", id)
        .eq("owner_id", user.id)
        .maybeSingle();

      if (rowError || !row) {
        setError(rowError?.message ?? "Listing not found or access denied.");
        setLoading(false);
        return;
      }

      const { data: category } = await supabase.from("categories").select("slug").eq("id", row.category_id).maybeSingle();
      setCategorySlug(category?.slug ?? "electronics");
      setListing(row as EditableListing);
      setLoading(false);
    });
  }, [id, router]);

  return (
    <div>
      <TopNav />
      <main className="container-px py-8">
        <section className="card mx-auto max-w-2xl space-y-4 p-5">
          <h1 className="text-2xl font-bold">Edit listing</h1>
          {loading && <p className="text-sm text-slate-600">Loading listing…</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}
          {listing && (
            <ListingForm
              mode="edit"
              listingId={listing.id}
              initial={{
                title: listing.title,
                description: listing.description,
                price: String(listing.price),
                city: listing.city,
                condition: listing.condition,
                categorySlug
              }}
            />
          )}
        </section>
      </main>
    </div>
  );
}
