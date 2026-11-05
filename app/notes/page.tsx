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
  
  const notes = await getNotes(showImportant);

  return (
    <div>
      <h2>Notes</h2>

      <div>
        <Link href='/notes/new'>+ New note</Link>
      </div>

      <div>
        <Link href={showImportant ? "/notes" : "/notes?important=true"}>
          {showImportant ? "show all" : "show important only"}
        </Link>
      </div>

      {notes.length === 0 && <p>No notes yet.</p>}

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
