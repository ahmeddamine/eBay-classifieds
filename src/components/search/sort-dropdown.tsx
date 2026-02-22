import { ListingSort } from "@/types/marketplace";

export function SortDropdown({ value = "newest" }: { value?: ListingSort }) {
  return (
    <select name="sort" defaultValue={value} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
      <option value="newest">Newest</option>
      <option value="price_asc">Price: Low to High</option>
      <option value="price_desc">Price: High to Low</option>
    </select>
  );
}
