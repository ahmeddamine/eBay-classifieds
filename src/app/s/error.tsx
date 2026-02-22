"use client";

export default function SearchError() {
  return (
    <main className="container-px py-6">
      <div className="card p-6">
        <h2 className="text-lg font-bold">Could not load search results</h2>
        <p className="mt-1 text-sm text-slate-600">Please try refreshing the page.</p>
      </div>
    </main>
  );
}
