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

import styles from "./tailwind.css";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Grafbase Remix App" }];
};

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const loader: LoaderFunction = async (args) =>
  rootAuthLoader(
    args,
    async ({ request }) => {
      const { getToken } = request.auth;

      const token = await getToken({ template: process.env.JWT_TEMPLATE });

      return { token };
    },
    { loadUser: true }
  );

export const CatchBoundary = ClerkCatchBoundary();

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
