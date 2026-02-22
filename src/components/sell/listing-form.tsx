"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { categories } from "@/data/mock";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { validateListingInput } from "@/lib/validation";
import { ListingCondition } from "@/types/marketplace";

type ListingFormProps = {
  mode: "create" | "edit";
  listingId?: string;
  initial?: {
    title: string;
    description: string;
    price: string;
    city: string;
    condition: ListingCondition;
    categorySlug: string;
  };
};

export function ListingForm({ mode, listingId, initial }: ListingFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [price, setPrice] = useState(initial?.price ?? "");
  const [city, setCity] = useState(initial?.city ?? "");
  const [condition, setCondition] = useState<ListingCondition>(initial?.condition ?? "good");
  const [categorySlug, setCategorySlug] = useState(initial?.categorySlug ?? categories[0]?.slug ?? "electronics");
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validationError = useMemo(
    () => validateListingInput({ title, description, price, city }),
    [title, description, price, city]
  );

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace(mode === "edit" && listingId ? `/auth/login?next=/sell/${listingId}/edit` : "/auth/login?next=/sell");
      }
    });
  }, [router, mode, listingId]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (validationError) {
      setError(validationError);
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setError("Supabase environment variables are missing.");
      return;
    }

    setLoading(true);
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      setLoading(false);
      router.push(mode === "edit" && listingId ? `/auth/login?next=/sell/${listingId}/edit` : "/auth/login?next=/sell");
      return;
    }

    await supabase
      .from("profiles")
      .upsert({ id: user.id, display_name: user.user_metadata?.display_name ?? user.email ?? "User" });

    const { data: category } = await supabase.from("categories").select("id").eq("slug", categorySlug).maybeSingle();
    if (!category?.id) {
      setError("Selected category is invalid.");
      setLoading(false);
      return;
    }

    const payload = {
      owner_id: user.id,
      category_id: category.id,
      title: title.trim(),
      description: description.trim(),
      price: Number(price),
      condition,
      city: city.trim(),
      status: "active" as const
    };

    let resolvedListingId = listingId;

    if (mode === "create") {
      const { data, error: insertError } = await supabase.from("listings").insert(payload).select("id").single();
      if (insertError || !data) {
        setError(insertError?.message ?? "Failed to create listing.");
        setLoading(false);
        return;
      }
      resolvedListingId = data.id;
    } else {
      const { error: updateError } = await supabase
        .from("listings")
        .update(payload)
        .eq("id", listingId)
        .eq("owner_id", user.id);

      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }
    }

    if (resolvedListingId && files && files.length > 0) {
      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];
        const path = `${user.id}/${resolvedListingId}/${Date.now()}-${i}-${file.name}`;

        const { error: uploadError } = await supabase.storage
          .from("listing-images")
          .upload(path, file, { cacheControl: "3600", upsert: false });

        if (uploadError) {
          setError(`Image upload failed for ${file.name}: ${uploadError.message}`);
          setLoading(false);
          return;
        }

        const { data: pub } = supabase.storage.from("listing-images").getPublicUrl(path);
        const { error: imageInsertError } = await supabase.from("listing_images").insert({
          listing_id: resolvedListingId,
          storage_path: path,
          public_url: pub.publicUrl,
          sort_order: i
        });

        if (imageInsertError) {
          setError(`Image metadata save failed: ${imageInsertError.message}`);
          setLoading(false);
          return;
        }
      }
    }

    setLoading(false);
    router.push("/my-listings");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <input value={title} onChange={(e) => setTitle(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2" placeholder="Title" />
      <select value={categorySlug} onChange={(e) => setCategorySlug(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2">
        {categories.map((category) => (
          <option key={category.id} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
      <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" min="0" step="0.01" className="rounded-lg border border-slate-200 px-3 py-2" placeholder="Price" />
      <input value={city} onChange={(e) => setCity(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2" placeholder="City" />
      <select value={condition} onChange={(e) => setCondition(e.target.value as ListingCondition)} className="rounded-lg border border-slate-200 px-3 py-2">
        <option value="new">New</option>
        <option value="like_new">Like new</option>
        <option value="good">Good</option>
        <option value="fair">Fair</option>
        <option value="used">Used</option>
      </select>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2" placeholder="Description" rows={5} />
      <input type="file" multiple accept="image/*" onChange={(e) => setFiles(e.target.files)} className="rounded-lg border border-slate-200 px-3 py-2" />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button disabled={loading} className="rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white disabled:opacity-60">
        {loading ? "Saving..." : mode === "create" ? "Publish listing" : "Save changes"}
      </button>
    </form>
  );
}
