import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { V2_MetaFunction, LinksFunction } from "@remix-run/node";

import styles from "./tailwind.css";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Grafbase Commerce Starter" }];
};

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

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

export default App;
