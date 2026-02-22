import Link from "next/link";
import { Listing } from "@/types/marketplace";

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <article className="card overflow-hidden">
      <img src={listing.imageUrl} alt={listing.title} className="h-44 w-full object-cover" />
      <div className="space-y-2 p-4">
        <div className="text-xl font-bold">€{listing.price}</div>
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
