import { UserDetails } from "@/models/userDetails";
import { NextAuthOptions, getServerSession, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user: User & {
      isAdmin: Boolean;
    };
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    isAdmin: Boolean;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      // clientId: process.env.GOOGLE_ID as string,
      // clientSecret: process.env.GOOGLE_SECRET as string,
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],

  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    async jwt({ token }) {
      const userInDb = await UserDetails.findOne({
        email: token.email!,
      });
      token.isAdmin = userInDb?.isAdmin!;
      return token;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
