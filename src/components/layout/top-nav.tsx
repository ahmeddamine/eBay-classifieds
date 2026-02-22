import Link from "next/link";
import { AuthNavActions } from "@/components/auth/auth-nav-actions";

export function TopNav() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="container-px flex h-16 items-center justify-between gap-3">
        <Link href="/" className="text-lg font-extrabold tracking-tight text-brand-700">
          BazaarLane
        </Link>
        <nav className="hidden items-center gap-4 text-sm text-slate-600 md:flex">
          <Link href="/favorites">Favorites</Link>
          <Link href="/messages">Messages</Link>
          <AuthNavActions />
        </nav>
        <Link
          href="/sell"
          className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Post ad
        </Link>
      </div>
    </header>
  );
}
