import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [], // Credentials real só entra em auth.ts
 callbacks: {
  authorized({ auth, request: { nextUrl } }) {
    const isLoggedIn = !!auth?.user;

    if (nextUrl.pathname.startsWith("/admin")) {
      return isLoggedIn && auth?.user?.role === "ADMIN";
    }

    if (nextUrl.pathname.startsWith("/painel")) {
      return isLoggedIn;
    }

    return true;
  },

  jwt({ token, user }) {
    console.log("========== JWT CALLBACK ==========");
    console.log("USER:", user);
    console.log("TOKEN ANTES:", token);

    if (user) {
      token.id = user.id;
      token.role = user.role;
    }

    console.log("TOKEN DEPOIS:", token);

    return token;
  },

  session({ session, token }) {
    console.log("========== SESSION CALLBACK ==========");
    console.log("TOKEN:", token);

    if (session.user) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
    }

    console.log("SESSION:", session);

    return session;
  },
},
} satisfies NextAuthConfig;