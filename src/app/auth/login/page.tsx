"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TopNav } from "@/components/layout/top-nav";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setError("Supabase environment variables are missing.");
      setLoading(false);
      return;
    }

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    const nextPath = searchParams.get("next") ?? "/";
    router.push(nextPath);
    router.refresh();
  }

  return (
    <div>
      <TopNav />
      <main className="container-px py-8">
        <section className="card mx-auto max-w-md space-y-4 p-5">
          <h1 className="text-2xl font-bold">Log in</h1>
          <form className="grid gap-3" onSubmit={onSubmit}>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded-lg border border-slate-200 px-3 py-2" />
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="rounded-lg border border-slate-200 px-3 py-2" />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button disabled={loading} className="rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white disabled:opacity-60">{loading ? "Logging in..." : "Log in"}</button>
          </form>
          <p className="text-sm text-slate-600">
            New here? <Link href="/auth/signup" className="font-medium text-brand-700">Create account</Link>
          </p>
        </section>
      </main>
    </div>
  );
}
