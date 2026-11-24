// Shared building blocks for the admin dashboard. The dashboard is for the shop
// owner only, so its copy is English and lives here rather than in src/i18n.
import { Link } from "@tanstack/react-router";
import { ExternalLink, LogOut, Package, Tags } from "lucide-react";
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
import { useAdminAuth } from "./auth";

export const inputClass =
  "h-11 w-full rounded-xl border border-input bg-card px-3.5 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30 sm:text-sm";
export const textareaClass =
  "min-h-24 w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30 sm:text-sm";

export function AdminHeader() {
  const { email, signOut } = useAdminAuth();
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
          <span className="hidden max-w-44 truncate text-xs text-muted-foreground md:inline">
            {email}
          </span>
          <button
            type="button"
            onClick={() => void signOut()}
            className={cn(nav, "text-muted-foreground")}
          >
            <LogOut className="size-4" /> Sign out
          </button>
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
