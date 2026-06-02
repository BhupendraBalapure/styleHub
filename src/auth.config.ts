import type { NextAuthConfig } from "next-auth";
import type { Role } from "@prisma/client";

/**
 * Edge-safe auth config (no Prisma / bcrypt). Used by middleware and shared
 * with the full server-side auth instance in `auth.ts`.
 */
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
      }
      return session;
    },
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      const loggedIn = !!auth?.user;
      const isAdmin = auth?.user?.role === "ADMIN";

      if (pathname.startsWith("/admin")) return isAdmin;
      if (pathname.startsWith("/account")) return loggedIn;
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
