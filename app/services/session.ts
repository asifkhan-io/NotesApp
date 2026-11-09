import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import { db } from "@/app/db";
import { users } from "@/app/db/schema";

export const getCurrentUser = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  return db.query.users.findFirst({
    where: eq(users.username, session.user.email),
  });
};
