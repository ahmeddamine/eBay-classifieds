import Link from "next/link";

export default function ListingNotFound() {
  return (
    <main className="container-px py-10">
      <div className="card mx-auto max-w-lg space-y-3 p-6 text-center">
        <h1 className="text-2xl font-bold">Listing not found</h1>
        <p className="text-sm text-slate-600">This listing may have been removed or is no longer available.</p>
        <Link href="/s" className="inline-block rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white">
          Browse listings
        </Link>
      </div>
    </main>
  );
}
