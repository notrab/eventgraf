import { json, createCookieSessionStorage, redirect } from "@remix-run/node";
import { GraphQLClient, gql } from "graphql-request";
import bcrypt from "bcryptjs";

const grafbase = new GraphQLClient(process.env.GRAFBASE_API_URL!, {
  headers: {
    "x-api-key": process.env.GRAFBASE_API_KEY!,
  },
});

const storage = createCookieSessionStorage({
  cookie: {
    name: "kudos-session",
    secure: process.env.NODE_ENV === "production",
    secrets: [process.env.SESSION_SECRET!],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

type CreateSessionPayload = {
  customerId: string;
  redirectTo?: string;
};

const createSession = async (payload: CreateSessionPayload) => {
  const session = await storage.getSession();

  session.set("customerId", payload.customerId);

  return redirect(payload.redirectTo || "/", {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
};

export type SignUpFormPayload = {
  name: string;
  email: string;
  password: string;
};

export type SignInFormPayload = {
  email: string;
  password: string;
};

export const signUp = async (data: SignUpFormPayload) => {
  const { name, email, password } = data;

  console.log({ name, email, password });

  const user = true;

  if (user) {
    return json(
      {
        error: "Invalid email",
      },
      {
        status: 400,
      }
    );
  }

  const newUser = await grafbase.request(
    gql`
      mutation SignUp($name: String!, $email: Email!, $password: String!) {
        customerCreate(
          input: { name: $name, email: $email, password: $password }
        ) {
          customerCreate {
            customer {
              id
            }
          }
        }
      }
    `,
    {
      name,
      email,
      password: await bcrypt.hash(password, 10),
    }
  );

  if (!newUser) {
    return json(
      {
        errors: "Something went wrong. Try again later.",
        fields: { name, email, password },
      },
      {
        status: 400,
      }
    );
  }

  return createSession({
    customerId: newUser.customerCreate.customer.id,
  });
};
