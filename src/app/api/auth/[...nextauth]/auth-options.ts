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
      profileUrl:
        "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=",
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
      async authorize(credentials, req) {
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
                    // @ts-ignore
                    cookie: req.headers.cookie || "",
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
      // session.user = token as any;
      // session.user.id = user ? user.id : "";
      // session.user.firstName = token.firstName as string;
      // session.user.lastName = token.lastName as string;
      // return Promise.resolve(session);
      session.user.accessToken = token.accessToken as string;
      session.user.userId = token.userId as number;
      return session;
    },
    async jwt({ token, user, account, profile }) {
      // const isSignIn = user ? true : false;
      // if (isSignIn && account) {
      //   try {
      //     if (account.type == "credentials") {
      //       token.firstName = user.firstName;
      //       token.lastName = user.lastName;
      //       token.jwt = user.jwt;
      //       token.id = user.id;
      //       return Promise.resolve(token);
      //     } else {
      //       const publicUrl = process.env.NEXT_PUBLIC_API_URL;
      //       const response = await fetch(
      //         `${publicUrl}/auth/${account.provider}/callback?access_token=${account.access_token}`
      //       );
      //       const data = await response.json();
      //       token.jwt = data.jwt;
      //       token.id = data.user.id;
      //       return Promise.resolve(token);
      //     }
      //   } catch (error) {
      //     console.log("Fetch failed", error);
      //   }
      // } else {
      //   console.log("DATA IS NULL");
      // }
      // return Promise.resolve(token);
      if (account) {
        if (account.type !== "credentials") {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/${account.provider}/callback?access_token=${account.accessToken}`
          );
          const data = await res.json();
          const { jwt, user } = data;
          token.accessToken = jwt;
          token.userId = user.id;
        } else {
          token.name = `${user.firstname} ${user.lastname}`;
          token.accessToken = user.jwt;
          token.firstName = user.firstname;
          token.lastName = user.lastname;
          token.username = user.username;
          token.userId = user.id;
        }
      }
      return token;
    },
  },
};
