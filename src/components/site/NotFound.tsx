import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Leaf } from "@/components/site/Leaf";
import { useI18n } from "@/i18n";

export function NotFound() {
  const { t } = useI18n();
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-hero px-4 pt-24">
      <Leaf className="absolute left-1/2 top-1/2 h-[28rem] w-72 -translate-x-1/2 -translate-y-1/2 text-primary/10" />
      <div className="relative max-w-md text-center">
        <p className="font-display text-8xl italic text-primary">404</p>
        <h1 className="mt-4 text-3xl font-medium">{t.notFound.title}</h1>
        <p className="mt-3 text-muted-foreground">{t.notFound.text}</p>
        <Button asChild variant="forest" size="lg" className="mt-8">
          <Link to="/">{t.notFound.home}</Link>
        </Button>
      </div>
    </section>
  );
}

/** Shown while a page waits for the live catalogue (e.g. a product added in the dashboard). */
export function CatalogLoading() {
  const { t } = useI18n();
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-hero px-4 pt-24">
      <div className="flex flex-col items-center gap-4 text-muted-foreground">
        <span className="size-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
        <p>{t.common.loadingProducts}</p>
      </div>
    </section>
  );
}
