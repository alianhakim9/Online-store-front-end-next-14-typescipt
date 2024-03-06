import axios, { AxiosError, AxiosResponse } from "axios";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET as string,
  providers: [
    GoogleProvider({
      id: "google",
      name: "Google",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, _req) {
        try {
          return (
            (await axios
              .post(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/local`,
                {
                  identifier: credentials?.email,
                  password: credentials?.password,
                },
                {
                  headers: {
                    Accept: "*/*",
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((response: AxiosResponse) => {
                const user = { ...response.data.user, jwt: response.data.jwt };
                if (user) {
                  return user;
                } else {
                  return null;
                }
              })
              .catch((error: AxiosError) => {
                console.log(error);
                throw new Error(error.message);
              })) || null
          );
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user = token as any;
      session.user.id = user ? user.id : "";
      return Promise.resolve(session);
    },
    async jwt({ token, user, account }) {
      const isSignIn = user ? true : false;
      if (isSignIn && account) {
        try {
          if (account.type == "credentials") {
            // @ts-ignore
            token.jwt = user.jwt;
            token.id = user.id;
          } else {
            const publicUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(
              `${publicUrl}/auth/${account.provider}/callback?access_token=${account.access_token}`
            );
            const data = await response.json();
            token.jwt = data.jwt;
            token.id = data.user.id;
          }
        } catch (error) {
          console.log("Fetch failed", error);
        }
      }
      return Promise.resolve(token);
    },
  },
};
