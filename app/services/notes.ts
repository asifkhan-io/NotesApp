export type Note = { id: number; content: string; important: boolean };

const notes: Note[] = [
  { id: 1, content: "HTML is easy", important: true },
  { id: 2, content: "Browser can execute only JavaScript", important: false },
];

export const getNotes = () => notes;

export const getNote = (id: number) => notes.find((note) => note.id === id);

export const addNote = (content: string, important: boolean) => {
  const id = notes.length ? Math.max(...notes.map((n) => n.id)) + 1 : 1;
  notes.push({ id, content, important });
};
// services/notes.ts

export const getNoteById = (id: number) => {
  return notes.find((note) => note.id === id);
};
export const toggleImportance = (id: number) => {
  const note = notes.find((note) => note.id === id);
  if (note) {
    note.important = !note.important;
  }
};
