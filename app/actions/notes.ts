"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  createNote as createNoteService,
  toggleImportance,
} from "../services/notes";

import { getCurrentUser } from "../services/session";

export const createNote = async (
  _prevState: { error: string; success: boolean },
  formData: FormData,
) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const content = String(formData.get("content") ?? "").trim();

  if (!content || content.length < 10) {
    return {
      error: "Note content must be at least 10 characters long",
      success: false,
    };
  }

  const important = formData.get("important") === "on";

  await createNoteService(content, important, user.id);

  revalidatePath("/notes");
  revalidatePath(`/users/${user.id}`);

  return {
    error: "",
    success: true,
  };
};

export const toggleNoteImportance = async (formData: FormData) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const id = Number(formData.get("id"));

  if (!Number.isSafeInteger(id) || id <= 0) {
    return;
  }

  await toggleImportance(id, user.id);

  revalidatePath(`/notes/${id}`);
  revalidatePath("/notes");
};
