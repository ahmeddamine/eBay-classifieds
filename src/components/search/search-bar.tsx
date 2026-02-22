import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <form className="card grid gap-2 p-3 md:grid-cols-[1.7fr_1fr_1fr_auto] md:items-center md:p-4">
      <input className="rounded-lg border border-slate-200 px-3 py-2" placeholder="What are you looking for?" />
      <select className="rounded-lg border border-slate-200 px-3 py-2">
        <option>All categories</option>
        <option>Electronics</option>
        <option>Home & Garden</option>
      </select>
      <input className="rounded-lg border border-slate-200 px-3 py-2" placeholder="City" />
      <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2 font-medium text-white">
        <Search className="h-4 w-4" /> Search
      </button>
    </form>
  );
}
