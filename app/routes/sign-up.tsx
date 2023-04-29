import type { ActionFunction, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import React from "react";

import { signUp } from "~/utils/auth.server";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Sign Up" }];
};

// loader
// redirect if logged in

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();

  const name = form.get("name");
  const email = form.get("email");
  const password = form.get("password");

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return json({ error: "Invalid" }, { status: 400 });
  }

  const errors = {
    name: false,
    email: false,
    password: false,
    // email: validateEmail(email)
    // password: validatepassword(email)
  };

  console.log({ errors });

  if (Object.values(errors).some(Boolean)) {
    return json({ errors, fields: { name, email, password } });
  }

  return await signUp({ name, email, password });
};

export default function SignUpPage() {
  const actionData = useActionData();
  const [errors, setErrors] = React.useState(actionData?.errors || {});
  const [formData, setFormData] = React.useState({
    name: actionData?.fields?.name || "",
    email: actionData?.fields?.email || "",
    password: actionData?.fields?.password || "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => setFormData((form) => ({ ...form, [field]: event.target.value }));

  return (
    <>
      <h1>Sign Up</h1>

      <Form method="POST">
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange(e, "name")}
          />
          {errors?.name && <p>{errors?.name}</p>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange(e, "email")}
          />
          {errors?.email && <p>{errors?.email}</p>}
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange(e, "password")}
          />
          {errors?.password && <p>{errors?.password}</p>}
        </div>

        <button type="submit">Create account</button>
      </Form>

      <p className="text-text-500">
        Already got an account?
        <Link to="/sign-in">Sign In</Link>
      </p>
    </>
  );
}
