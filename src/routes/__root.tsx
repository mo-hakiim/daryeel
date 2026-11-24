import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { MotionConfig } from "motion/react";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Button } from "@/components/ui/button";
import { Floaters } from "@/components/site/Floaters";
import { Footer } from "@/components/site/Footer";
import { Leaf } from "@/components/site/Leaf";
import { Navbar } from "@/components/site/Navbar";
import { Preloader } from "@/components/site/Preloader";
import { LanguageProvider, readSavedLang, useI18n } from "@/i18n";

function NotFoundComponent() {
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

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Try again
          </Button>
          <Button asChild variant="outline">
            <a href={import.meta.env.BASE_URL}>Go home</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  beforeLoad: () => ({ lang: readSavedLang() }),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Daryeel Wellness — Natural Health, Wellness & Consultation" },
      {
        name: "description",
        content:
          "Daryeel Wellness in Hargeisa, Somaliland: herbal products, sports nutrition, vitamins, minerals and natural wellness consultations, online and in person.",
      },
      { name: "author", content: "Daryeel Wellness" },
      { name: "theme-color", content: "#2e700a" },
      { property: "og:site_name", content: "Daryeel Wellness" },
      { property: "og:title", content: "Daryeel Wellness — Natural Health, Wellness & Consultation" },
      {
        property: "og:description",
        content: "Herbal products, sports nutrition, vitamins, minerals and natural wellness consultations in Hargeisa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: `${import.meta.env.BASE_URL}favicon.png` },
      { rel: "apple-touch-icon", href: `${import.meta.env.BASE_URL}apple-touch-icon.png` },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const { lang } = Route.useRouteContext();
  return (
    <html lang={lang}>
      <head>
        <HeadContent />
      </head>
      <body>
        <LanguageProvider initialLang={lang}>{children}</LanguageProvider>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
        <Preloader />
        <Navbar />
        <main id="main">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <Footer />
        <Floaters />
      </MotionConfig>
    </QueryClientProvider>
  );
}
