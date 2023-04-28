import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import { getAuth } from "@clerk/remix/ssr.server";
import { createClerkClient } from "@clerk/remix/api.server";

export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);

  if (!userId) {
    return redirect(`/sign-in?redirect_url=${args.request.url}`);
  }

  const user = await createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
  }).users.getUser(userId);

  if (user?.publicMetadata?.role !== "admin") {
    return redirect("/");
  }

  return null;
};

export default function Index() {
  return (
    <>
      <div className="bg-red-500 p-5 text-white">Admin</div>
      <div className="p-5">
        <Outlet />
      </div>
    </>
  );
}
