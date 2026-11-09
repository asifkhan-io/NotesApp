"use server";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "../db";
import { users } from "../db/schema";

export type RegistrationState = {
  error?: string;
  values?: {
    username: string;
    name: string;
  };
};

export async function registerUser(
  _previousState: RegistrationState,
  formData: FormData,
): Promise<RegistrationState> {
  const usernameValue = formData.get("username");
  const nameValue = formData.get("name");
  const passwordValue = formData.get("password");
  const passwordConfirmValue = formData.get("passwordConfirm");

  if (
    typeof usernameValue !== "string" ||
    typeof nameValue !== "string" ||
    typeof passwordValue !== "string" ||
    typeof passwordConfirmValue !== "string"
  ) {
    return { error: "Username, name, password, and confirmation are required" };
  }

  const username = usernameValue.trim();
  const name = nameValue.trim();
  const values = { username, name };

  if (username.length < 4) {
    return { error: "Username must be at least 4 characters long", values };
  }

  if (!name) {
    return { error: "Name is required", values };
  }

  if (passwordValue.length < 4) {
    return { error: "Password must be at least 4 characters long", values };
  }

  if (passwordValue !== passwordConfirmValue) {
    return { error: "Passwords do not match", values };
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  if (existingUser) {
    return { error: "Username is already registered", values };
  }

  const passwordHash = await bcrypt.hash(passwordValue, 12);

  try {
    await db.insert(users).values({ username, name, passwordHash });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "23505"
    ) {
      return { error: "Username is already registered", values };
    }

    throw error;
  }

  redirect("/login");
}
