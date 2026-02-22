import Link from "next/link";
import { TopNav } from "@/components/layout/top-nav";
import { ListingCard } from "@/components/listing/listing-card";
import { FiltersPanel } from "@/components/search/filters-panel";
import { MobileFiltersDrawer } from "@/components/search/mobile-filters-drawer";
import { SearchBar } from "@/components/search/search-bar";
import { SortDropdown } from "@/components/search/sort-dropdown";
import { searchListings } from "@/lib/listings";
import { SearchFilters } from "@/types/marketplace";
import { buildSearchPageUrl, parseSearchFilters } from "@/lib/search-params";

export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filters: SearchFilters = parseSearchFilters(params);

  const { items, total, page, totalPages } = await searchListings(filters);

  return (
    <div>
      <TopNav />
      <main className="container-px space-y-4 py-6">
        <SearchBar values={filters} />

        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-xl font-bold">{total} results</h1>
          <form action="/s" className="flex items-center gap-2">
            <input type="hidden" name="q" value={filters.q ?? ""} />
            <input type="hidden" name="category" value={filters.category ?? ""} />
            <input type="hidden" name="city" value={filters.city ?? ""} />
            <input type="hidden" name="minPrice" value={filters.minPrice ?? ""} />
            <input type="hidden" name="maxPrice" value={filters.maxPrice ?? ""} />
            <input type="hidden" name="condition" value={filters.condition ?? ""} />
            <input type="hidden" name="sellerType" value={filters.sellerType ?? ""} />
            <input type="hidden" name="shipping" value={filters.shipping ?? ""} />
            <SortDropdown value={filters.sort} />
            <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm">Update</button>
          </form>
        </div>

        <MobileFiltersDrawer values={filters} />

        <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
          <form action="/s" className="card hidden p-4 lg:block">
            <FiltersPanel values={filters} />
          </form>

          <section className="space-y-4">
            {items.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="card p-8 text-center">
                <h2 className="text-lg font-bold">No listings found</h2>
                <p className="mt-1 text-sm text-slate-600">Try broadening your filters or search in another city.</p>
                <Link href="/s" className="mt-4 inline-block rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white">
                  Clear filters
                </Link>
              </div>
            )}

            {items.length > 0 && (
              <div className="flex items-center justify-between">
                <Link href={buildSearchPageUrl(filters, Math.max(1, page - 1))} className="rounded border border-slate-300 px-3 py-2 text-sm">
                  Previous
                </Link>
                <span className="text-sm text-slate-600">
                  Page {page} of {totalPages}
                </span>
                <Link href={buildSearchPageUrl(filters, Math.min(totalPages, page + 1))} className="rounded border border-slate-300 px-3 py-2 text-sm">
                  Next
                </Link>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
