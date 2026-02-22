import { categories } from "@/data/mock";
import { SearchFilters } from "@/types/marketplace";

type FiltersPanelProps = {
  values?: SearchFilters;
};

export function FiltersPanel({ values = {} }: FiltersPanelProps) {
  return (
    <div className="space-y-3 text-sm">
      <h3 className="font-semibold">Filters</h3>

      <div>
        <label className="mb-1 block text-slate-600">Category</label>
        <select name="category" defaultValue={values.category ?? ""} className="w-full rounded border border-slate-200 px-2 py-1">
          <option value="">All</option>
          {categories.map((category) => (
            <option value={category.slug} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-slate-600">Price range</label>
        <div className="grid grid-cols-2 gap-2">
          <input name="minPrice" defaultValue={values.minPrice} className="rounded border border-slate-200 px-2 py-1" placeholder="Min" />
          <input name="maxPrice" defaultValue={values.maxPrice} className="rounded border border-slate-200 px-2 py-1" placeholder="Max" />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-slate-600">Condition</label>
        <select name="condition" defaultValue={values.condition ?? ""} className="w-full rounded border border-slate-200 px-2 py-1">
          <option value="">Any</option>
          <option value="new">New</option>
          <option value="like_new">Like new</option>
          <option value="good">Good</option>
          <option value="fair">Fair</option>
          <option value="used">Used</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-slate-600">Seller type</label>
        <select name="sellerType" defaultValue={values.sellerType ?? ""} className="w-full rounded border border-slate-200 px-2 py-1">
          <option value="">All</option>
          <option value="private">Private</option>
          <option value="business">Business</option>
        </select>
      </div>

      <label className="flex items-center gap-2 text-slate-700">
        <input type="checkbox" name="shipping" value="yes" defaultChecked={values.shipping === "yes"} />
        Shipping available
      </label>

      <input type="hidden" name="q" value={values.q ?? ""} />
      <input type="hidden" name="city" value={values.city ?? ""} />
      <input type="hidden" name="sort" value={values.sort ?? "newest"} />

      <button className="w-full rounded-lg bg-brand-600 px-3 py-2 font-semibold text-white">Apply filters</button>
    </div>
  );
}
