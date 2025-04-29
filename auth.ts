import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { findUserByCredentials, User } from "@/lib/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "E-mail" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user: User | null = await findUserByCredentials(
          credentials.email as string,
          credentials.password as string
        );

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session }) {
      return session;
    },
  },
  trustHost: true,
});