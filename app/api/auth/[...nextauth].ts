import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Correo", type: "email", placeholder: "correo@cliente.com" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        // Mock: acepta cualquier usuario con contraseña "demo"
        if (credentials?.email && credentials?.password === "demo") {
          return { id: "1", name: "Usuario Demo", email: credentials.email };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };