import type { V2_MetaFunction } from "@remix-run/node";

import { UserProfile } from "@clerk/remix";

export const meta: V2_MetaFunction = () => {
  return [{ title: "My Account" }];
};

export default function UserProfilePage() {
  return <UserProfile path="/user" routing="path" />;
}
