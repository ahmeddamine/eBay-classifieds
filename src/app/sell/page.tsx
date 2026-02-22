import { TopNav } from "@/components/layout/top-nav";

export default function SellPage() {
  return (
    <div>
      <TopNav />
      <main className="container-px py-8">
        <section className="card mx-auto max-w-2xl space-y-4 p-5">
          <h1 className="text-2xl font-bold">Create listing</h1>
          <p className="text-sm text-slate-600">Auth + real posting form will be added in Phase 6.</p>
          <form className="grid gap-3">
            <input className="rounded-lg border border-slate-200 px-3 py-2" placeholder="Title" />
            <textarea className="rounded-lg border border-slate-200 px-3 py-2" placeholder="Description" rows={4} />
            <button className="rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white">Continue</button>
          </form>
        </section>
      </main>
    </div>
  );
}
