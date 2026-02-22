"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TopNav } from "@/components/layout/top-nav";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type MyListing = {
  id: string;
  title: string;
  price: number;
  city: string;
  status: string;
  created_at: string;
};

export default function MyListingsPage() {
  const router = useRouter();
  const [items, setItems] = useState<MyListing[]>([]);
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
        router.replace("/auth/login?next=/my-listings");
        return;
      }

      const { data: listings, error: listError } = await supabase
        .from("listings")
        .select("id,title,price,city,status,created_at")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false });

      if (listError) setError(listError.message);
      setItems((listings ?? []) as MyListing[]);
      setLoading(false);
    });
  }, [router]);

  return (
    <div>
      <TopNav />
      <main className="container-px space-y-4 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My listings</h1>
          <Link href="/sell" className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white">New listing</Link>
        </div>

        {loading && <div className="card p-4 text-sm text-slate-600">Loading your listings…</div>}
        {error && <div className="card p-4 text-sm text-red-600">{error}</div>}

        {!loading && !error && (
          <div className="card divide-y divide-slate-200">
            {items.length === 0 ? (
              <div className="p-6 text-sm text-slate-600">You do not have active listings yet.</div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 p-4">
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-slate-600">€{item.price} · {item.city}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs">{item.status}</span>
                    <Link href={`/sell/${item.id}/edit`} className="rounded border border-slate-300 px-2 py-1 text-sm">Edit</Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
