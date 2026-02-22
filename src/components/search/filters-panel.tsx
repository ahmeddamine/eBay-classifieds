export function FiltersPanel() {
  return (
    <aside className="card space-y-3 p-4 text-sm">
      <h3 className="font-semibold">Filters</h3>
      <div>
        <label className="mb-1 block text-slate-600">Price range</label>
        <div className="grid grid-cols-2 gap-2">
          <input className="rounded border border-slate-200 px-2 py-1" placeholder="Min" />
          <input className="rounded border border-slate-200 px-2 py-1" placeholder="Max" />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-slate-600">Condition</label>
        <select className="w-full rounded border border-slate-200 px-2 py-1">
          <option>Any</option>
          <option>New</option>
          <option>Used</option>
        </select>
      </div>
      <div>
        <label className="mb-1 block text-slate-600">Seller type</label>
        <select className="w-full rounded border border-slate-200 px-2 py-1">
          <option>All</option>
          <option>Private</option>
          <option>Business</option>
        </select>
      </div>
    </aside>
  );
}
