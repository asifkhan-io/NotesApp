import { Suspense } from "react";
import { connection } from "next/server";
import { createNote } from "../../actions/notes";
import { getUsers } from "../../services/users";

const NoteForm = async () => {
  await connection();
  const users = await getUsers();

  return (
    <form action={createNote}>
      <div>
        <input name='content' placeholder='Write a note...' required />
      </div>
      <div>
        <label>
          <input type='checkbox' name='important' /> Important
        </label>
      </div>
      <div>
        <select name='userId' required defaultValue=''>
          <option value='' disabled>
            Select a user
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <button type='submit'>Add note</button>
    </form>
  );
};

export default function NewNotePage() {
  return (
    <div>
      <h2>New note</h2>
      <Suspense fallback={<p>Loading form...</p>}>
        <NoteForm />
      </Suspense>
    </div>
  );
}
