import { deleteSnippet } from '@/actions';
import { db } from '@/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// type safety for params props
interface Props {
  params: {
    id: string;
  };
}

// make component async and accept params as props
export default async function Page(props: Props) {
  // // artificial delay
  // await new Promise((r) => setTimeout(r, 2000));

  // assign id from params and name as snippetId
  const { id: snippetId } = props.params;

  // fetch snippet by id from db and display title
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(snippetId) },
  });

  // if snippet not found, redirect to 404 page
  if (!snippet) {
    notFound();
  }

  const deleteSnippetAction = deleteSnippet.bind(null, snippet.id);

  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="p-2 border rounded"
          >
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button className="p-2 border rounded">Delete</button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}

// running static cache for each snippet
export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();
  return snippets.map((snippet) => {
    return {
      id: snippet.id.toString(),
    };
  });
}
