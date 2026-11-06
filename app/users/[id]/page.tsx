import { Suspense } from "react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { getUserById, getNotesByUserId } from "../../services/users";

const UserDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  await connection();
  const { id } = await params;
  const userId = Number(id);
  if (!Number.isInteger(userId)) notFound();

  const user = await getUserById(userId);
  if (!user) notFound();

  const notes = await getNotesByUserId(userId);

  return (
    <div>
      <h2>{user.name}</h2>
      <p>@{user.username}</p>
      <h3>Notes</h3>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.content} {note.important && "⭐"}
          </li>
        ))}
      </ul>
    </div>
  );
};

const UserPage = ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <Suspense fallback={<p>Loading user...</p>}>
      <UserDetails params={params} />
    </Suspense>
  );
};

export default UserPage;
