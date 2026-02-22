import { listings } from "@/data/mock";
import { Listing, ListingSort, SearchFilters } from "@/types/marketplace";

const PAGE_SIZE = 6;

function includesNormalized(text: string, query: string) {
  return text.toLowerCase().includes(query.toLowerCase());
}

export function filterAndSortListings(filters: SearchFilters): { items: Listing[]; total: number } {
  let result = [...listings];

  if (filters.q) {
    result = result.filter(
      (listing) => includesNormalized(listing.title, filters.q!) || includesNormalized(listing.description, filters.q!)
    );
  }

  if (filters.category) {
    result = result.filter((listing) => listing.categorySlug === filters.category);
  }

  if (filters.city) {
    result = result.filter((listing) => includesNormalized(listing.city, filters.city!));
  }

  if (filters.condition) {
    result = result.filter((listing) => listing.condition === filters.condition);
  }

  if (filters.sellerType) {
    result = result.filter((listing) => listing.sellerType === filters.sellerType);
  }

  if (filters.shipping === "yes") {
    result = result.filter((listing) => listing.ships);
  }

  const minPrice = filters.minPrice ? Number(filters.minPrice) : undefined;
  if (typeof minPrice === "number" && !Number.isNaN(minPrice)) {
    result = result.filter((listing) => listing.price >= minPrice);
  }

  const maxPrice = filters.maxPrice ? Number(filters.maxPrice) : undefined;
  if (typeof maxPrice === "number" && !Number.isNaN(maxPrice)) {
    result = result.filter((listing) => listing.price <= maxPrice);
  }

  const sort = (filters.sort ?? "newest") as ListingSort;
  if (sort === "price_asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === "price_desc") {
    result.sort((a, b) => b.price - a.price);
  }

  return { items: result, total: result.length };
}

export function paginateListings(items: Listing[], pageRaw?: string): { page: number; totalPages: number; slice: Listing[] } {
  const page = Math.max(1, Number(pageRaw ?? 1) || 1);
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  return {
    page: safePage,
    totalPages,
    slice: items.slice(start, start + PAGE_SIZE)
  };
}
