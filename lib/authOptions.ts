import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { User } from "@/models/UserSchema";
import { connectDB } from "./db";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      await connectDB();

      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        await User.create({
          email: user.email,
          provider: "google",
          isPremium: false,
        });
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        await connectDB();

        const dbUser = await User.findOne({ email: user.email });

        if (dbUser) {
          token.isPremium = dbUser.isPremium;
          token.tokenExpiry = 1200 * 60 * 1.5;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.isPremium = token.isPremium;
        session.user.expiryDate = token.expiryDate;
      }

      return session;
    },
  },
};
