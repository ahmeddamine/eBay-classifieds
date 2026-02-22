import Link from "next/link";
import { TopNav } from "@/components/layout/top-nav";

export default function SignupPage() {
  return (
    <div>
      <TopNav />
      <main className="container-px py-8">
        <section className="card mx-auto max-w-md space-y-4 p-5">
          <h1 className="text-2xl font-bold">Create account</h1>
          <form className="grid gap-3">
            <input placeholder="Full name" className="rounded-lg border border-slate-200 px-3 py-2" />
            <input type="email" placeholder="Email" className="rounded-lg border border-slate-200 px-3 py-2" />
            <input type="password" placeholder="Password" className="rounded-lg border border-slate-200 px-3 py-2" />
            <button className="rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white">Sign up</button>
          </form>
          <p className="text-sm text-slate-600">
            Already have an account? <Link href="/auth/login" className="font-medium text-brand-700">Log in</Link>
          </p>
        </section>
      </main>
    </div>
  );
}
