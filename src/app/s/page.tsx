import { TopNav } from "@/components/layout/top-nav";
import { ListingCard } from "@/components/listing/listing-card";
import { FiltersPanel } from "@/components/search/filters-panel";
import { SearchBar } from "@/components/search/search-bar";
import { SortDropdown } from "@/components/search/sort-dropdown";
import { listings } from "@/data/mock";

export default function SearchPage() {
  return (
    <div>
      <TopNav />
      <main className="container-px space-y-4 py-6">
        <SearchBar />
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Search results</h1>
          <SortDropdown />
        </div>
        <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
          <div className="hidden lg:block">
            <FiltersPanel />
          </div>
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
