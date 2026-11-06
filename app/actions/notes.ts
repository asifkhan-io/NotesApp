"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createNote as createNoteService,
  toggleImportance,
} from "../services/notes";

export const createNote = async (formData: FormData) => {
  const content = String(formData.get("content") ?? "").trim();
  const important = formData.get("important") === "on";
  const userId = Number(formData.get("userId"));

  if (!content || !Number.isInteger(userId) || userId <= 0) return;

  await createNoteService(content, important, userId);
  revalidatePath("/notes");
  revalidatePath(`/users/${userId}`);
  redirect("/notes");
};

export const toggleNoteImportance = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  await toggleImportance(id);
  revalidatePath(`/notes/${id}`);
  revalidatePath("/notes");
};
