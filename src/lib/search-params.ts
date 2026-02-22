import { SearchFilters } from "@/types/marketplace";

function asValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function parseSearchFilters(params: Record<string, string | string[] | undefined>): SearchFilters {
  return {
    q: asValue(params.q),
    category: asValue(params.category),
    city: asValue(params.city),
    radius: asValue(params.radius),
    minPrice: asValue(params.minPrice),
    maxPrice: asValue(params.maxPrice),
    condition: asValue(params.condition) as SearchFilters["condition"],
    sellerType: asValue(params.sellerType) as SearchFilters["sellerType"],
    shipping: asValue(params.shipping) as SearchFilters["shipping"],
    sort: (asValue(params.sort) as SearchFilters["sort"]) ?? "newest",
    page: asValue(params.page) ?? "1"
  };
}

export function buildSearchPageUrl(filters: SearchFilters, page: number): string {
  const query = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) query.set(key, value);
  });
  query.set("page", String(page));
  return `/s?${query.toString()}`;
}
