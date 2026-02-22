import { TopNav } from "@/components/layout/top-nav";
import { ListingForm } from "@/components/sell/listing-form";

export default function SellPage() {
  return (
    <div>
      <TopNav />
      <main className="container-px py-8">
        <section className="card mx-auto max-w-2xl space-y-4 p-5">
          <h1 className="text-2xl font-bold">Create listing</h1>
          <p className="text-sm text-slate-600">Post your item with photos, details, and price.</p>
          <ListingForm mode="create" />
        </section>
      </main>
    </div>
  );
}
