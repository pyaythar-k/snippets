'use client';
import { editSnippet } from '@/actions';
import { Editor } from '@monaco-editor/react';
import { Snippet } from '@prisma/client';

import { useState } from 'react';

// type safety for snippet props
interface Props {
  snippet: Snippet;
}

//snippet as destructured props
export default function SnippetEditForm({ snippet }: Props) {
  // state for snippet code
  const [code, setCode] = useState(snippet.code);

  // handler for Editor changes
  const handleEditorChange = (value: string = '') => {
    setCode(value);
  };

  // Option 1: bind snippet data with form data for editSnippet serfer action
  const editSnippetAction = editSnippet.bind(null, snippet.id, code);

  return (
    <div>
      {/* Editor from monaco-editor */}
      <Editor
        height="90vh"
        theme="vs-dark"
        defaultValue={snippet.code}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
        }}
      />
      <form action={editSnippetAction}>
        <button type="submit" className="border p-2 my-2">
          Save
        </button>
      </form>
    </div>
  );
}
