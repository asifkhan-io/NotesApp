"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createNote } from "../../actions/notes";
import { useNotification } from "../../components/NotificationContext";

const NewNote = () => {
  const [state, formAction] = useActionState(createNote, {
    error: "",
    success: false,
  });
  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      showNotification("note created");
      router.push("/notes");
    }
  }, [state, showNotification, router]);

  return (
    <div>
      <h2>Create a new note</h2>
      <form action={formAction}>
        <div>
          <label>
            Content
            <input type='text' name='content' />
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
