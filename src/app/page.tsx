import { TopNav } from "@/components/layout/top-nav";
import { ListingCard } from "@/components/listing/listing-card";
import { CategoryGrid } from "@/components/search/category-grid";
import { SearchBar } from "@/components/search/search-bar";
import { listings } from "@/data/mock";

export default function HomePage() {
  return (
    <div>
      <TopNav />
      <main className="container-px space-y-8 py-6">
        <SearchBar />
        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Browse categories</h2>
          <CategoryGrid />
        </section>
        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Recent listings</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
