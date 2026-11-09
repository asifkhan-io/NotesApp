"use client";

import { useActionState } from "react";
import { createNote } from "../../actions/notes";

const NewNote = () => {
  const [state, formAction] = useActionState(createNote, {
    error: "",
  });

  return (
    <div>
      <h2>Create a new note</h2>

      <form action={formAction}>
        <div>
          <label>
            Content
            <input
              type='text'
              name='content'
              required
              minLength={10}
            />
          </label>
        </div>

        <div>
          <label>
            <input type='checkbox' name='important' />
            Important
          </label>
        </div>

        <button type='submit'>Create</button>

        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      </form>
    </div>
  );
};

export default NewNote;
