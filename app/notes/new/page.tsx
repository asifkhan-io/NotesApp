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
      showNotification("Note created successfully");
      router.push("/notes");
    }
  }, [state.success, showNotification, router]);

  return (
    <div className='mx-auto max-w-2xl p-6'>
      <h2 className='mb-4 text-2xl font-bold'>Create a new note</h2>

      <form action={formAction} className='space-y-4'>
        <div>
          <label htmlFor='content' className='mb-1 block font-medium'>
            Content
          </label>

          <input
            id='content'
            type='text'
            name='content'
            required
            minLength={10}
            className='w-full rounded border border-gray-400 p-2'
          />
        </div>

        <div>
          <label className='flex items-center gap-2'>
            <input type='checkbox' name='important' />
            Important
          </label>
        </div>

        {state.error && (
          <p className='text-red-600' role='alert'>
            {state.error}
          </p>
        )}

        <button
          type='submit'
          className='rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default NewNote;
