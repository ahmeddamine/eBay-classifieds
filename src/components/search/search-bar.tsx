import { Search } from "lucide-react";
import { categories } from "@/data/mock";
import { SearchFilters } from "@/types/marketplace";

type SearchBarProps = {
  action?: string;
  values?: SearchFilters;
};

export function SearchBar({ action = "/s", values = {} }: SearchBarProps) {
  return (
    <form action={action} className="card grid gap-2 p-3 md:grid-cols-[1.7fr_1fr_1fr_auto] md:items-center md:p-4">
      <input
        name="q"
        defaultValue={values.q}
        className="rounded-lg border border-slate-200 px-3 py-2"
        placeholder="What are you looking for?"
      />
      <select name="category" defaultValue={values.category ?? ""} className="rounded-lg border border-slate-200 px-3 py-2">
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
      <input name="city" defaultValue={values.city} className="rounded-lg border border-slate-200 px-3 py-2" placeholder="City" />
      <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2 font-medium text-white">
        <Search className="h-4 w-4" /> Search
      </button>
    </form>
  );
}
