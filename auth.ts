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
      // Se está logando agora, adiciona os dados
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.phone = user.phone;
        token.studentId = user.studentId;
        // Adicione mais campos se necessário
      }
      return token;
    },
    async session({ session, token }) {
      // Passa os dados do token para a session
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email ?? "";
        session.user.phone = token.phone;
        session.user.studentId = token.studentId as string | undefined;
      }
      return session;
    },
  },
  trustHost: true,
});