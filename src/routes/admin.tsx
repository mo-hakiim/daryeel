import { useState, type FormEvent } from "react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Lock, ShieldAlert } from "lucide-react";

import { AdminAuthProvider, useAdminAuth } from "@/admin/auth";
import { AdminHeader, Field, Spinner, errorMessage, inputClass } from "@/admin/ui";
import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

// The dashboard is not linked from the site and is kept out of search engines.
export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin — Daryeel Wellness" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <AdminAuthProvider>
      <div className="min-h-screen bg-hero">
        <Gate />
      </div>
      <Toaster position="top-center" richColors />
    </AdminAuthProvider>
  );
}

function Gate() {
  const { status, email, signOut } = useAdminAuth();

  if (status === "checking") {
    return (
      <Centered>
        <Spinner className="size-8" />
      </Centered>
    );
  }
  if (status === "unconfigured") {
    return (
      <Centered>
        <Card>
          <ShieldAlert className="mx-auto size-8 text-primary" />
          <h1 className="mt-3 text-center text-2xl font-medium">Dashboard not connected</h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            This build has no Supabase settings. Add <code>VITE_SUPABASE_URL</code> and{" "}
            <code>VITE_SUPABASE_ANON_KEY</code> (GitHub secrets or <code>.env</code>) and rebuild.
          </p>
        </Card>
      </Centered>
    );
  }
  if (status === "signedOut") return <LoginForm />;
  if (status === "notAdmin") {
    return (
      <Centered>
        <Card>
          <ShieldAlert className="mx-auto size-8 text-destructive" />
          <h1 className="mt-3 text-center text-2xl font-medium">No access</h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            {email} is signed in but is not an admin of this shop.
          </p>
          <Button className="mt-6 w-full" variant="outline" onClick={() => void signOut()}>
            Sign out
          </Button>
        </Card>
      </Centered>
    );
  }
  return (
    <>
      <AdminHeader />
      <main className="mx-auto max-w-5xl px-4 py-6 sm:py-10">
        <Outlet />
      </main>
    </>
  );
}

function LoginForm() {
  const { signIn } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await signIn(email.trim(), password);
    } catch (err) {
      const msg = errorMessage(err);
      setError(/invalid/i.test(msg) ? "Wrong email or password." : msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Centered>
      <Card>
        <Logo className="mx-auto h-10" />
        <h1 className="mt-6 text-center text-2xl font-medium">Shop dashboard</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Sign in to manage products.
        </p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <Field label="Email">
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Password">
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </Field>
          {error && (
            <p
              role="alert"
              className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              {error}
            </p>
          )}
          <Button type="submit" variant="forest" size="lg" className="w-full" disabled={busy}>
            {busy ? (
              <Spinner className="border-forest-foreground/30 border-t-forest-foreground" />
            ) : (
              <Lock />
            )}
            Sign in
          </Button>
        </form>
      </Card>
    </Centered>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-screen items-center justify-center px-4 py-10">{children}</div>;
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-sm rounded-3xl border bg-card p-6 shadow-lift sm:p-8">
      {children}
    </div>
  );
}
