// import { Suspense } from "react";
// import Link from "next/link";
// import { getNotes } from "../services/notes";

// async function NotesContent({
//   searchParams,
// }: {
//   searchParams: Promise<{ important?: string }>;
// }) {
//   const { important } = await searchParams;
//   const showImportant = important === "true";

//   const notes = await getNotes(showImportant);

//   return (
//     <div>
//       <h2>Notes</h2>

//       <div>
//         <Link href='/notes/new'>+ New note</Link>
//       </div>

//       <div>
//         <Link href={showImportant ? "/notes" : "/notes?important=true"}>
//           {showImportant ? "show all" : "show important only"}
//         </Link>
//       </div>

//       {notes.length === 0 && <p>No notes yet.</p>}

//       <ul>
//         {notes.map((note) => (
//           <li key={note.id}>
//             <Link href={`/notes/${note.id}`}>{note.content}</Link>
//             {note.important && <strong> (important)</strong>}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default function NotesPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ important?: string }>;
// }) {
//   return (
//     <Suspense fallback={<div>Loading notes...</div>}>
//       <NotesContent searchParams={searchParams} />
//     </Suspense>
//   );
// }

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
    <div className='max-w-2xl mx-auto p-6'>
      <h2 className='text-2xl font-bold mb-4'>Notes</h2>

      <div className='mb-4'>
        <Link href='/notes/new' className='text-blue-600 hover:underline'>
          + New note
        </Link>
      </div>

      <div className='mb-4'>
        <Link
          href={showImportant ? "/notes" : "/notes?important=true"}
          className='text-blue-600 hover:underline'
        >
          {showImportant ? "show all" : "show important only"}
        </Link>
      </div>

      {notes.length === 0 && <p>No notes yet.</p>}

      <ul className='space-y-2'>
        {notes.map((note) => (
          <li key={note.id} className='border rounded p-3 hover:bg-gray-50'>
            <Link
              href={`/notes/${note.id}`}
              className='text-blue-600 hover:underline'
            >
              {note.content}
            </Link>

            {note.important && (
              <strong className='ml-2 text-amber-600'>(important)</strong>
            )}
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
