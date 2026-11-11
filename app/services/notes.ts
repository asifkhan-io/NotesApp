import { and, eq } from "drizzle-orm";

import { db } from "../db";
import { notes } from "../db/schema";

export type Note = typeof notes.$inferSelect;

export const getNotes = async (importantOnly: boolean) => {
  if (importantOnly) {
    return db.query.notes.findMany({
      where: eq(notes.important, true),
    });
  }

  return db.query.notes.findMany();
};

export const getNote = async (id: number) => {
  const [note] = await db.select().from(notes).where(eq(notes.id, id));

  return note;
};

export const getNoteById = async (id: number) => {
  return db.query.notes.findFirst({
    where: eq(notes.id, id),
  });
};

export const createNote = async (
  content: string,
  important: boolean,
  userId: number,
) => {
  await db.insert(notes).values({
    content,
    important,
    userId,
  });
};

export const toggleImportance = async (id: number, userId: number) => {
  const note = await db.query.notes.findFirst({
    where: and(eq(notes.id, id), eq(notes.userId, userId)),
  });

  if (!note) {
    return;
  }

  await db
    .update(notes)
    .set({ important: !note.important })
    .where(and(eq(notes.id, id), eq(notes.userId, userId)));
};
