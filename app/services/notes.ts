import { eq } from "drizzle-orm";
import { db } from "@/app/db";
import { notes } from "@/app/db/schema";

export type Note = typeof notes.$inferSelect;

export const getNotes = async () => {
  return await db.select().from(notes).orderBy(notes.id);
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
