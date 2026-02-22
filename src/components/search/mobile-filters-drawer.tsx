import { SlidersHorizontal } from "lucide-react";
import { FiltersPanel } from "@/components/search/filters-panel";
import { SearchFilters } from "@/types/marketplace";

export function MobileFiltersDrawer({ values }: { values: SearchFilters }) {
  return (
    <details className="card lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 font-semibold">
        Filters
        <SlidersHorizontal className="h-4 w-4" />
      </summary>
      <form action="/s" className="border-t border-slate-200 p-4">
        <FiltersPanel values={values} />
      </form>
    </details>
  );
}
