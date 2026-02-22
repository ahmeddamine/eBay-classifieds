import Link from "next/link";
import { notFound } from "next/navigation";
import { TopNav } from "@/components/layout/top-nav";
import { ImageGallery } from "@/components/listing/image-gallery";
import { ListingCard } from "@/components/listing/listing-card";
import { SellerCard } from "@/components/listing/seller-card";
import { listings as mockListings } from "@/data/mock";
import { getListingById } from "@/lib/listings";

export default async function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = await getListingById(id);

  if (!listing) {
    notFound();
  }

  const related = mockListings.filter((item) => item.categorySlug === listing.categorySlug && item.id !== listing.id).slice(0, 3);

  return (
    <div>
      <TopNav />
      <main className="container-px grid gap-4 py-6 lg:grid-cols-[1fr_320px]">
        <section className="space-y-4">
          <ImageGallery imageUrl={listing.imageUrl} title={listing.title} />
          <div className="card space-y-4 p-4">
            <div>
              <p className="text-3xl font-bold">€{listing.price}</p>
              <h1 className="text-2xl font-bold">{listing.title}</h1>
              <p className="text-sm text-slate-500">
                {listing.city} · {listing.postedAt}
              </p>
            </div>
            <table className="w-full border-collapse text-sm">
              <tbody>
                {listing.attributes.map((attr) => (
                  <tr key={attr.label} className="border-t border-slate-200">
                    <th className="py-2 text-left text-slate-500">{attr.label}</th>
                    <td className="py-2">{attr.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-slate-700">{listing.description}</p>
            <div className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
              Interested? You need an account to message this seller or save this listing.
              <div className="mt-2 flex gap-2">
                <Link href="/auth/login" className="font-semibold text-brand-700">
                  Log in
                </Link>
                <span>·</span>
                <Link href="/auth/signup" className="font-semibold text-brand-700">
                  Create account
                </Link>
              </div>
            </div>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-bold">Related listings</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.length > 0 ? related.map((item) => <ListingCard key={item.id} listing={item} />) : <p className="text-sm text-slate-500">No related listings yet.</p>}
            </div>
          </section>
        </section>
        <SellerCard seller={listing.seller} listingId={listing.id} />
      </main>
    </div>
  );
}
