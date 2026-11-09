import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db } from "./app/db";
import { users } from "./app/db/schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          typeof credentials?.username !== "string" ||
          typeof credentials?.password !== "string"
        ) {
          return null;
        }

        const username = credentials.username.trim();
        if (!username || !credentials.password) {
          return null;
        }

        const user = await db.query.users.findFirst({
          where: eq(users.username, username),
        });

        if (!user || !user.passwordHash) {
          return null;
        }

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);

        if (!isValid) {
          return null;
        }

        return {
          id: String(user.id),
          name: user.name,
          email: user.username,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET ?? process.env.BETTER_AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});
