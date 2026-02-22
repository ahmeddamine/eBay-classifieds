import { listings as mockListings } from "@/data/mock";
import { Listing, SearchFilters } from "@/types/marketplace";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { filterAndSortListings, paginateListings } from "@/lib/search";

const PAGE_SIZE = 12;

type ListingRowWithRelations = {
  id: string;
  title: string;
  description: string;
  price: number;
  city: string;
  condition: Listing["condition"];
  created_at: string;
  categories: { slug: string } | null;
  profiles: { id: string; display_name: string; created_at: string } | null;
  listing_images: Array<{ public_url: string | null; sort_order: number }>;
};

export async function getRecentListings(limit = 8): Promise<Listing[]> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return mockListings.slice(0, limit);

  const { data, error } = await supabase
    .from("listings")
    .select(
      `
      id,title,description,price,city,condition,created_at,
      categories:category_id(slug),
      profiles:owner_id(id,display_name,created_at),
      listing_images(public_url,sort_order)
    `
    )
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) return mockListings.slice(0, limit);
  return (data as unknown as ListingRowWithRelations[]).map(mapRowToListing);
}

export async function searchListings(filters: SearchFilters): Promise<{ items: Listing[]; total: number; page: number; totalPages: number }> {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    const filtered = filterAndSortListings(filters);
    const paged = paginateListings(filtered.items, filters.page);
    return { items: paged.slice, total: filtered.total, page: paged.page, totalPages: paged.totalPages };
  }

  let query = supabase
    .from("listings")
    .select(
      `
      id,title,description,price,city,condition,created_at,
      categories:category_id(slug),
      profiles:owner_id(id,display_name,created_at),
      listing_images(public_url,sort_order)
    `,
      { count: "exact" }
    )
    .eq("status", "active");

  if (filters.q) query = query.or(`title.ilike.%${filters.q}%,description.ilike.%${filters.q}%`);
  if (filters.city) query = query.ilike("city", `%${filters.city}%`);
  if (filters.minPrice) query = query.gte("price", Number(filters.minPrice));
  if (filters.maxPrice) query = query.lte("price", Number(filters.maxPrice));
  if (filters.condition) query = query.eq("condition", filters.condition);

  if (filters.category) {
    const { data: cat } = await supabase.from("categories").select("id").eq("slug", filters.category).maybeSingle();
    if (cat?.id) query = query.eq("category_id", cat.id);
    else return { items: [], total: 0, page: 1, totalPages: 1 };
  }

  if (filters.sort === "price_asc") query = query.order("price", { ascending: true });
  else if (filters.sort === "price_desc") query = query.order("price", { ascending: false });
  else query = query.order("created_at", { ascending: false });

  const page = Math.max(1, Number(filters.page ?? "1") || 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error, count } = await query.range(from, to);
  if (error || !data) {
    const filtered = filterAndSortListings(filters);
    const paged = paginateListings(filtered.items, filters.page);
    return { items: paged.slice, total: filtered.total, page: paged.page, totalPages: paged.totalPages };
  }

  const total = count ?? data.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  return { items: (data as unknown as ListingRowWithRelations[]).map(mapRowToListing), total, page: Math.min(page, totalPages), totalPages };
}

export async function getListingById(id: string): Promise<Listing | null> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return mockListings.find((item) => item.id === id) ?? null;

  const { data, error } = await supabase
    .from("listings")
    .select(
      `
      id,title,description,price,city,condition,created_at,
      categories:category_id(slug),
      profiles:owner_id(id,display_name,created_at),
      listing_images(public_url,sort_order)
    `
    )
    .eq("status", "active")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return mockListings.find((item) => item.id === id) ?? null;
  return mapRowToListing(data as unknown as ListingRowWithRelations);
}

function mapRowToListing(row: ListingRowWithRelations): Listing {
  const firstImage = [...(row.listing_images ?? [])].sort((a, b) => a.sort_order - b.sort_order)[0]?.public_url;
  return {
    id: row.id,
    title: row.title,
    price: Number(row.price),
    city: row.city,
    postedAt: new Date(row.created_at).toLocaleDateString(),
    imageUrl: firstImage ?? "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",
    condition: row.condition,
    categorySlug: row.categories?.slug ?? "other",
    sellerType: "private",
    ships: false,
    seller: {
      id: row.profiles?.id ?? "unknown",
      name: row.profiles?.display_name ?? "Marketplace seller",
      memberSince: row.profiles?.created_at ? new Date(row.profiles.created_at).getFullYear().toString() : "2024",
      listingCount: 1
    },
    description: row.description,
    attributes: [{ label: "Condition", value: row.condition.replace("_", " ") }]
  };
}
