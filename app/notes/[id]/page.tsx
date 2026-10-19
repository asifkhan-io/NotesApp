import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNote } from "../../services/notes";
import { toggleNoteImportance } from "../../actions/notes";

async function NoteContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const noteId = Number(id);
  if (Number.isNaN(noteId)) notFound();

  const note = await getNote(noteId);
  if (!note) notFound();

  return (
    <div>
      <Link href='/notes'>← Back to notes</Link>
      <h2>Note #{note.id}</h2>
      <p>{note.content}</p>
      <p>{note.important ? "Marked important" : "Not important"}</p>

      <form action={toggleNoteImportance}>
        <input type='hidden' name='id' value={note.id} />
        <button type='submit'>
          {note.important ? "Unmark important" : "Mark important"}
        </button>
      </form>
    </div>
  );
}

export default function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<div>Loading note...</div>}>
      <NoteContent params={params} />
    </Suspense>
  );
}
