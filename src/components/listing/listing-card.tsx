import Link from "next/link";
import { Listing } from "@/types/marketplace";

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <article className="card overflow-hidden transition hover:shadow-md">
      <img src={listing.imageUrl} alt={listing.title} className="h-44 w-full object-cover" />
      <div className="space-y-2 p-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">€{listing.price}</div>
          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs capitalize text-slate-600">{listing.condition.replace("_", " ")}</span>
        </div>
        <Link href={`/listing/${listing.id}`} className="line-clamp-2 font-medium hover:text-brand-700">
          {listing.title}
        </Link>
        <p className="text-sm text-slate-500">
          {listing.city} · {listing.postedAt}
        </p>
      </div>
    </article>
  );
}
