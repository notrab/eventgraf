import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type {
  V2_MetaFunction,
  LinksFunction,
  LoaderFunction,
} from "@remix-run/node";
import { rootAuthLoader } from "@clerk/remix/ssr.server";
import { ClerkApp, ClerkCatchBoundary } from "@clerk/remix";
import { useRouteError, isRouteErrorResponse } from "@remix-run/react";
import {
  RemixRootDefaultCatchBoundary,
  RemixRootDefaultErrorBoundary,
} from "@remix-run/react/dist/errorBoundaries";

import styles from "./tailwind.css";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Grafbase Remix App" }];
};

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const loader: LoaderFunction = (args) => rootAuthLoader(args);

// export const CatchBoundary = ClerkCatchBoundary();

function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-white">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default ClerkApp(App);

export const ErrorBoundary = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    const { __clerk_ssr_interstitial_html } =
      error?.data?.clerkState?.__internal_clerk_state || {};
    if (__clerk_ssr_interstitial_html) {
      return (
        <html
          dangerouslySetInnerHTML={{ __html: __clerk_ssr_interstitial_html }}
        />
      );
    }
    return <RemixRootDefaultCatchBoundary />;
  } else if (error instanceof Error) {
    return <RemixRootDefaultErrorBoundary error={error} />;
  } else {
    let errorString =
      error == null
        ? "Unknown Error"
        : typeof error === "object" && "toString" in error
        ? error.toString()
        : JSON.stringify(error);
    return <RemixRootDefaultErrorBoundary error={new Error(errorString)} />;
  }
};
