import Link from "next/link";
import { categories } from "@/data/mock";

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/s?category=${category.slug}`}
          className="card flex flex-col items-center gap-1 p-4 text-center hover:border-brand-500"
        >
          <span className="text-2xl">{category.icon}</span>
          <span className="text-sm font-medium">{category.name}</span>
        </Link>
      ))}
    </div>
  );
}
