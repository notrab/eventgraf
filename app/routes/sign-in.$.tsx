import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import { SignIn } from "@clerk/remix";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Sign In" }];
};

export default function SignInPage() {
  return (
    <>
      <h1>Sign In</h1>
      <SignIn routing={"path"} path={"/sign-in"} />
      <p className="text-text-500">
        No account yet?
        <Link to="/sign-up">Sign Up</Link>
      </p>
    </>
  );
}
