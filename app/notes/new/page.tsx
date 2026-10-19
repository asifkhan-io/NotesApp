import { createNote } from "../../actions/notes";

export default function NewNotePage() {
  return (
    <div>
      <h2>New note</h2>
      <form action={createNote}>
        <div>
          <input name='content' placeholder='Write a note...' required />
        </div>
        <div>
          <label>
            <input type='checkbox' name='important' /> Important
          </label>
        </div>
        <button type='submit'>Add note</button>
      </form>
    </div>
  );
}
