import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import prisma from "@/app/lib/prisma";

export const options: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Аккаунт",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user: User | null = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (
          user &&
          (await bcrypt.compare(credentials?.password, user.password))
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/login",
    verifyRequest: "/auth/verify",
    newUser: "/auth/register",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("user", user);
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("token", token);

      if (!token.sub || !token.name) return session;

      session.user.id = token.sub;
      session.user.name = token.name;
      session.user.role = token.role;

      console.log("session", session);

      return session;
    },
  },
};