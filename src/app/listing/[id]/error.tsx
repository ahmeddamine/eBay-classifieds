"use client";

export default function ListingError() {
  return (
    <main className="container-px py-6">
      <div className="card p-6">
        <h2 className="text-lg font-bold">Could not load listing</h2>
        <p className="mt-1 text-sm text-slate-600">Please try again in a moment.</p>
      </div>
    </main>
  );
}
