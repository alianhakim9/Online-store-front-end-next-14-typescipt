import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      accessToken: string;
      userId: number;
      firstname: string;
      lastname: string;
    } & DefaultSession["user"];
  }

  interface User {
    firstname: string;
    lastname: string;
    username: string;
    jwt: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    firstName: string;
    lastName: string;
    username: string;
  }
}
