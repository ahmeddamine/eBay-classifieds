import { Listing } from "@/types/marketplace";

export function SellerCard({ seller }: { seller: Listing["seller"] }) {
  return (
    <aside className="card space-y-3 p-4">
      <h3 className="text-lg font-semibold">Seller</h3>
      <p className="font-medium">{seller.name}</p>
      <p className="text-sm text-slate-600">Member since {seller.memberSince}</p>
      <p className="text-sm text-slate-600">{seller.listingCount} active listings</p>
      <button className="w-full rounded-lg bg-brand-600 px-3 py-2 font-semibold text-white">Message seller</button>
      <button className="w-full rounded-lg border border-slate-300 px-3 py-2 font-semibold">Save favorite</button>
    </aside>
  );
}
