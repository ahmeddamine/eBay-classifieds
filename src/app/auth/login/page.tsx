import Link from "next/link";
import { TopNav } from "@/components/layout/top-nav";

export default function LoginPage() {
  return (
    <div>
      <TopNav />
      <main className="container-px py-8">
        <section className="card mx-auto max-w-md space-y-4 p-5">
          <h1 className="text-2xl font-bold">Log in</h1>
          <form className="grid gap-3">
            <input type="email" placeholder="Email" className="rounded-lg border border-slate-200 px-3 py-2" />
            <input type="password" placeholder="Password" className="rounded-lg border border-slate-200 px-3 py-2" />
            <button className="rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white">Log in</button>
          </form>
          <p className="text-sm text-slate-600">
            New here? <Link href="/auth/signup" className="font-medium text-brand-700">Create account</Link>
          </p>
        </section>
      </main>
    </div>
  );
}
