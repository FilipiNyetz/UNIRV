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
            cpf: user.cpf,
            studentId: user.studentId
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.studentId = user.studentId;
        token.cpf = user.cpf;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email ?? "";
        session.user.cpf = token.cpf ?? "";
        session.user.studentId = token.studentId as string | undefined;
      }
      return session;
    },
  },
  trustHost: true,
});