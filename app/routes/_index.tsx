import type { V2_MetaFunction, LoaderFunction } from "@remix-run/node";
import { SignedIn, SignedOut } from "@clerk/remix";
import { Link } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Browse" }];
};

export const loader: LoaderFunction = async ({ context, params }) => {
  console.log({ context, params });

  return null;
};

export default function Index() {
  return (
    <>
      <h1 className="title">Welcome to my store!</h1>
      <SignedIn>
        <p className="text-green-800">Hello user!</p>
      </SignedIn>
      <SignedOut>
        <p className="text-red-500">Hello guest!</p>
        <p className="text-text-500">
          <Link to="/sign-in">Sign In</Link>
        </p>
      </SignedOut>
    </>
  );
}
