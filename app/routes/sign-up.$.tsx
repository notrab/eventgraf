import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import { SignUp } from "@clerk/remix";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Sign Up" }];
};

export default function SignUpPage() {
  return (
    <>
      <h1>Sign Up</h1>
      <SignUp routing={"path"} path={"/sign-up"} />
      <p className="text-text-500">
        Already got an account?
        <Link to="/sign-in">Sign In</Link>
      </p>
    </>
  );
}
