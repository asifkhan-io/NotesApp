"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addNote, toggleImportance } from "../services/notes";

export const createNote = async (formData: FormData) => {
  const content = String(formData.get("content") ?? "").trim();
  const important = formData.get("important") === "on";

  if (!content) return;

  await addNote(content, important);
  revalidatePath("/notes");
  redirect("/notes");
};

export const toggleNoteImportance = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  await toggleImportance(id);
  revalidatePath(`/notes/${id}`);
  revalidatePath("/notes");
};
