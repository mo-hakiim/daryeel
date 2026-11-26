import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useMatch,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { MotionConfig } from "motion/react";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Button } from "@/components/ui/button";
import { Floaters } from "@/components/site/Floaters";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { NotFound } from "@/components/site/NotFound";
import { Preloader } from "@/components/site/Preloader";
import { CatalogProvider } from "@/data/store";
import { initialUrlHash } from "@/lib/supabase";
import { LanguageProvider, readSavedLang } from "@/i18n";

function NotFoundComponent() {
  return <NotFound />;
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
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
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
    // Each public page sets its own title, description, canonical URL, preview tags and
    // structured data through pageHead() in src/lib/seo.ts.
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Daryeel Wellness – Supplements & Vitamins in Hargeisa" },
      { name: "author", content: "Daryeel Wellness" },
      { name: "theme-color", content: "#2e700a" },
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

/**
 * GitHub Pages has no page for products/categories added after the last build, so
 * public/404.html stores the requested path and sends the visitor to the home page;
 * this picks it up and opens the right page.
 */
function useDeepLinkRedirect() {
  const router = useRouter();
  useEffect(() => {
    // A password-reset email link that landed on another page (Supabase falls back to the
    // Site URL when the reset address isn't on its allow-list): forward it, tokens included.
    const hash = window.location.hash || initialUrlHash;
    if (
      /type=recovery|error_code=/.test(hash) &&
      !/\/admin\/reset-password\/?$/.test(window.location.pathname)
    ) {
      window.location.replace(`${import.meta.env.BASE_URL}admin/reset-password${hash}`);
      return;
    }
    let target: string | null = null;
    try {
      target = sessionStorage.getItem("dw_redirect");
      sessionStorage.removeItem("dw_redirect");
    } catch {
      return;
    }
    if (!target || !target.startsWith("/") || target.startsWith("//")) return;
    router.history.replace(import.meta.env.BASE_URL.replace(/\/$/, "") + target);
  }, [router]);
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const isAdmin = Boolean(useMatch({ from: "/admin", shouldThrow: false }));
  useDeepLinkRedirect();

  return (
    <QueryClientProvider client={queryClient}>
      <CatalogProvider>
        <MotionConfig reducedMotion="user">
          {isAdmin ? (
            <Outlet />
          ) : (
            <>
              <Preloader />
              <Navbar />
              <main id="main">
                {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
                <Outlet />
              </main>
              <Footer />
              <Floaters />
            </>
          )}
        </MotionConfig>
      </CatalogProvider>
    </QueryClientProvider>
  );
}
