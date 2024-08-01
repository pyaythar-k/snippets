'use client';
import { createSnippet, editSnippet } from '@/actions';
import { useFormState } from 'react-dom';

export default function Page() {
  const [formState, action] = useFormState(createSnippet, {
    message: '',
  });

  return (
    // create form to create a new snippet
    // assign createSnippet server action in form action
    <form action={action}>
      <h3 className="font-bold m-3">Create a Snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input
            name="title"
            className="border rounded p-2 w-full"
            id="title"
          />
        </div>

        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <textarea
            name="code"
            className="border rounded p-2 w-full"
            id="code"
          />
        </div>

        {formState.message && (
          <div className="border border-red-700 bg-red-300 my-2 p-2">
            {formState.message}
          </div>
        )}
        <button type="submit" className="rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>
  );
}
