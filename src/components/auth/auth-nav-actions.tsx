"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export function AuthNavActions() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getUser().then(({ data }) => {
      setIsAuthed(Boolean(data.user));
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthed(Boolean(session?.user));
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    router.refresh();
  }

  if (loading) return <span className="text-sm text-slate-400">...</span>;

  if (isAuthed) {
    return (
      <>
        <Link href="/my-listings">My listings</Link>
        <button onClick={handleLogout} className="text-left">
          Logout
        </button>
      </>
    );
  }

  return (
    <>
      <Link href="/auth/login">Login</Link>
      <Link href="/auth/signup">Sign up</Link>
    </>
  );
}
