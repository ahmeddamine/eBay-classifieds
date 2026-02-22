import { TopNav } from "@/components/layout/top-nav";
import { ImageGallery } from "@/components/listing/image-gallery";
import { SellerCard } from "@/components/listing/seller-card";
import { listings } from "@/data/mock";

export default async function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = listings.find((item) => item.id === id) ?? listings[0];

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
          </div>
        </section>
        <SellerCard seller={listing.seller} />
      </main>
    </div>
  );
}
