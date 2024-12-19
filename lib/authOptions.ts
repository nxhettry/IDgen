import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/UserSchema";
import { connectDB } from "./db";
import { redirect } from "next/dist/server/api-utils";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signOut: "/", // Redirect to home page after sign out
  },

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

    async signOut() {
      redirect("/");
    },

    async jwt({ token, user }) {
      if (user) {
        await connectDB();

        const dbUser = await User.findOne({ email: user.email });

        if (dbUser) {
          token._id = dbUser._id;
          token.isPremium = dbUser.isPremium;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.isPremium = token.isPremium;
        session.user._id = token._id;
      }

      return session;
    },
  },
};
