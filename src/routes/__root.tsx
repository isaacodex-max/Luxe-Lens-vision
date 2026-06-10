import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient-gold">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The frame you're looking for has drifted out of focus.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-sm bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90">
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Something went dark</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try again or head home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Try again</button>
          <a href="/" className="rounded-sm border border-border px-4 py-2 text-sm">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Aurum Lens — Luxury Photography Studio | Lagos, Nigeria" },
      { name: "description", content: "Aurum Lens is a Lagos-based luxury photography studio crafting cinematic weddings, fashion editorials, portraits and brand stories." },
      { name: "author", content: "Aurum Lens" },
      { property: "og:title", content: "Aurum Lens — Luxury Photography Studio | Lagos, Nigeria" },
      { property: "og:description", content: "Aurum Lens is a Lagos-based luxury photography studio crafting cinematic weddings, fashion editorials, portraits and brand stories." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Aurum Lens" },
      { property: "og:image", content: "/og-image.jpg" },
      { property: "og:image:width", content: "1920" },
      { property: "og:image:height", content: "1280" },
      { property: "og:image:alt", content: "Aurum Lens — cinematic luxury photography" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Aurum Lens — Luxury Photography Studio | Lagos, Nigeria" },
      { name: "twitter:description", content: "Aurum Lens is a Lagos-based luxury photography studio crafting cinematic weddings, fashion editorials, portraits and brand stories." },
      { name: "twitter:image", content: "/og-image.jpg" },
      { name: "twitter:image:alt", content: "Aurum Lens — cinematic luxury photography" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Inter:wght@300;400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster theme="dark" position="bottom-center" toastOptions={{ style: { background: "oklch(0.09 0 0)", border: "1px solid oklch(1 0 0 / 0.1)", color: "oklch(0.97 0 0)" } }} />
    </QueryClientProvider>
  );
}
