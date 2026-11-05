import { eq } from "drizzle-orm";
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

export const addNote = async (content: string, important: boolean) => {
  await db.insert(notes).values({ content, important });
};

export const toggleImportance = async (id: number) => {
  const note = await getNoteById(id);
  if (note) {
    await db
      .update(notes)
      .set({ important: !note.important })
      .where(eq(notes.id, id));
  }
};
