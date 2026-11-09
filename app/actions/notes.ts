"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createNote as createNoteService,
  toggleImportance,
} from "../services/notes";
import { getCurrentUser } from "../services/session";

export const createNote = async (
  _prevState: { error: string },
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
    };
  }

  const important = formData.get("important") === "on";

  await createNoteService(content, important, user.id);
  revalidatePath("/notes");
  revalidatePath(`/users/${user.id}`);
  redirect("/notes");
};

export const toggleNoteImportance = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  await toggleImportance(id);
  revalidatePath(`/notes/${id}`);
  revalidatePath("/notes");
};
