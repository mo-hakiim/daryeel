// Shared building blocks for the admin dashboard. The dashboard is for the shop
// owner only, so its copy is English and lives here rather than in src/i18n.
import { Link } from "@tanstack/react-router";
import { ExternalLink, Package, Tags } from "lucide-react";
import type { ReactNode } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Logo } from "@/components/site/Logo";
import { cn } from "@/lib/utils";
import { AccountMenu } from "./account";

export const inputClass =
  "h-11 w-full rounded-xl border border-input bg-card px-3.5 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30 sm:text-sm";
export const textareaClass =
  "min-h-24 w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30 sm:text-sm";

export function AdminHeader() {
  const nav =
    "inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold transition-colors hover:bg-secondary";
  const active = "bg-secondary text-primary";
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
        <Link to="/admin" className="flex items-center gap-2">
          <Logo className="h-7 w-auto" />
          <span className="rounded-full bg-forest px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-forest-foreground">
            Admin
          </span>
        </Link>
        <nav className="order-3 flex w-full gap-1 sm:order-none sm:w-auto">
          <Link
            to="/admin"
            activeOptions={{ exact: true }}
            className={nav}
            activeProps={{ className: active }}
          >
            <Package className="size-4" /> Products
          </Link>
          <Link to="/admin/categories" className={nav} activeProps={{ className: active }}>
            <Tags className="size-4" /> Categories
          </Link>
          <a
            href={import.meta.env.BASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={nav}
          >
            <ExternalLink className="size-4" /> View site
          </a>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <AccountMenu />
        </div>
      </div>
    </header>
  );
}

export function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

export function Panel({
  title,
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-3xl border bg-card p-4 shadow-soft sm:p-6", className)}>
      {title && (
        <h2 className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.16em] text-primary">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block size-5 animate-spin rounded-full border-2 border-primary/20 border-t-primary",
        className,
      )}
    />
  );
}

export function ConfirmDelete({
  title,
  description,
  onConfirm,
  children,
}: {
  title: string;
  description: string;
  onConfirm: () => void;
  children: ReactNode;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="rounded-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function errorMessage(e: unknown) {
  if (e instanceof Error) {
    if (/duplicate key|23505/.test(e.message))
      return "That URL name (slug) is already used. Pick another one.";
    if (/foreign key|23503/.test(e.message))
      return "This category still has products. Move or delete them first.";
    return e.message;
  }
  return "Something went wrong.";
}

/**
 * Shrinks a photo before upload (phone pictures are often 5+ MB): max 1600 px on the
 * long side, saved as WebP. Falls back to the original file if the browser can't.
 */
export async function prepareImage(file: File): Promise<Blob> {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/webp", 0.85),
    );
    if (blob && blob.type === "image/webp") return blob;
  } catch {
    /* fall through */
  }
  return file;
}

/**
 * Plain-language message for sign-in and password errors from Supabase Auth.
 * Falls back to errorMessage() for anything else.
 */
export function authMessage(e: unknown): string {
  const status =
    typeof e === "object" && e && "status" in e ? Number((e as { status: unknown }).status) : -1;
  const code =
    typeof e === "object" && e && "code" in e ? String((e as { code: unknown }).code) : "";
  const text = `${code} ${e instanceof Error ? e.message : ""}`;
  if (status === 0)
    return "Can't reach the shop database right now. Check your internet connection and try again.";
  if (/wrong_current_password/.test(text)) return "Your current password is not correct.";
  if (/invalid_credentials|invalid login/i.test(text))
    return "Wrong email or password. Check both and try again — passwords are case-sensitive.";
  if (/email_not_confirmed|not confirmed/i.test(text))
    return "This account's email hasn't been confirmed yet. Confirm the user in Supabase → Authentication → Users, then try again.";
  if (/same_password|should be different/i.test(text))
    return "The new password must be different from the current one.";
  if (/weak_password|password should be|at least/i.test(text))
    return "That password is too weak. Use at least 8 characters with letters and numbers.";
  if (/otp_expired|expired|invalid.*link|access_denied/i.test(text))
    return "This reset link has expired or was already used. Request a new one from the sign-in page.";
  if (status === 429 || /rate_limit|too many/i.test(text))
    return "Too many attempts. Please wait a few minutes and try again.";
  if (/user_banned/.test(text)) return "This account has been disabled.";
  return errorMessage(e);
}

export function PasswordRules() {
  return (
    <p className="text-xs text-muted-foreground">
      At least 8 characters, with letters and numbers.
    </p>
  );
}

/** Returns a message if the new password isn't acceptable, otherwise null. */
export function checkNewPassword(next: string, confirm: string): string | null {
  if (next.length < 8) return "The new password must be at least 8 characters.";
  if (!/[a-z]/i.test(next) || !/\d/.test(next))
    return "Use both letters and numbers in the new password.";
  if (next !== confirm) return "The two new passwords don't match.";
  return null;
}

export function ErrorBox({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
      {message}
    </p>
  );
}

export function Centered({ children }: { children: ReactNode }) {
  return <div className="flex min-h-screen items-center justify-center px-4 py-10">{children}</div>;
}

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-sm rounded-3xl border bg-card p-6 shadow-lift sm:p-8">
      {children}
    </div>
  );
}
