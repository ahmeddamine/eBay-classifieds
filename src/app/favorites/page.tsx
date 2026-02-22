import { TopNav } from "@/components/layout/top-nav";
import { ListingCard } from "@/components/listing/listing-card";
import { listings } from "@/data/mock";

export default function FavoritesPage() {
  return (
    <div>
      <TopNav />
      <main className="container-px space-y-4 py-6">
        <h1 className="text-2xl font-bold">Favorites</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.slice(0, 2).map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </main>
    </div>
  );
}
