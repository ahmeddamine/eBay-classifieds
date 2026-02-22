import Link from "next/link";
import { TopNav } from "@/components/layout/top-nav";
import { ListingCard } from "@/components/listing/listing-card";
import { CategoryGrid } from "@/components/search/category-grid";
import { SearchBar } from "@/components/search/search-bar";
import { getRecentListings } from "@/lib/listings";

export default async function HomePage() {
  const recentListings = await getRecentListings(8);

  return (
    <div>
      <TopNav />
      <main className="container-px space-y-8 py-6">
        <section className="rounded-2xl bg-gradient-to-r from-brand-700 to-brand-500 p-5 text-white md:p-8">
          <p className="text-sm uppercase tracking-wide text-white/90">BazaarLane</p>
          <h1 className="mt-1 text-3xl font-extrabold md:text-4xl">Buy and sell locally, fast.</h1>
          <p className="mt-2 text-white/90">Find great deals nearby or post your ad in under 2 minutes.</p>
          <div className="mt-5">
            <SearchBar values={{}} />
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Browse categories</h2>
          <CategoryGrid />
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recent listings</h2>
            <Link href="/s" className="text-sm font-semibold text-brand-700">
              View all
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recentListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
