import { Suspense } from "react";
import Link from "next/link";
import { getNotes } from "../services/notes";

async function NotesContent({
  searchParams,
}: {
  searchParams: Promise<{ important?: string }>;
}) {
  const { important } = await searchParams;
  const showImportant = important === "true";
  const allNotes = getNotes();
  
  const notes = showImportant
    ? allNotes.filter((note) => note.important)
    : allNotes;

  return (
    <div>
      <h2>Notes</h2>
      <div>
        <Link href={showImportant ? "/notes" : "/notes?important=true"}>
          {showImportant ? "show all" : "show important only"}
        </Link>
      </div>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <Link href={`/notes/${note.id}`}>{note.content}</Link>
            {note.important && <strong> (important)</strong>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function NotesPage({
  searchParams,
}: {
  searchParams: Promise<{ important?: string }>;
}) {
  return (
    <Suspense fallback={<div>Loading notes...</div>}>
      <NotesContent searchParams={searchParams} />
    </Suspense>
  );
}
