import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/app/lib/prisma";
import { User } from "@/generated/prisma";

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


  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {

      if (!token.sub || !token.name) return session;

      session.user.id = token.sub;
      session.user.name = token.name;
      session.user.role = token.role;

      return session;
    },
  },
};