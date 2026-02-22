import { Listing } from "@/types/marketplace";
import { FavoriteToggleButton } from "@/components/listing/favorite-toggle-button";
import { StartConversationButton } from "@/components/messaging/start-conversation-button";

export function SellerCard({ seller, listingId }: { seller: Listing["seller"]; listingId: string }) {
  return (
    <aside className="card space-y-3 p-4 lg:sticky lg:top-4">
      <h3 className="text-lg font-semibold">Seller</h3>
      <p className="font-medium">{seller.name}</p>
      <p className="text-sm text-slate-600">Member since {seller.memberSince}</p>
      <p className="text-sm text-slate-600">{seller.listingCount} active listings</p>
      <StartConversationButton listingId={listingId} sellerId={seller.id} />
      <FavoriteToggleButton listingId={listingId} />
      <p className="text-xs text-slate-500">Login required for messaging and favorites.</p>
    </aside>
  );
}
