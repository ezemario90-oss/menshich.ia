import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../lib/prisma";

export default NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FB_APP_ID!,
      clientSecret: process.env.FB_APP_SECRET!,
      authorization: {
        params: {
          scope:
            "email,public_profile,pages_show_list,pages_read_engagement,pages_messaging,instagram_basic,instagram_manage_messages",
        },
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  jwt: { secret: process.env.JWT_SECRET },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expires = account.expires_at;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        (session as any).accessToken = token.accessToken;
      }
      if (token?.sub) (session as any).user.id = token.sub;
      return session;
    },
  },
});