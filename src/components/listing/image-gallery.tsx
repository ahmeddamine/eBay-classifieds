export function ImageGallery({ imageUrl, title }: { imageUrl: string; title: string }) {
  return (
    <section className="card overflow-hidden">
      <img src={imageUrl} alt={title} className="h-64 w-full object-cover sm:h-96" />
    </section>
  );
}
