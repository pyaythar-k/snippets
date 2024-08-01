import { db } from '@/db';
import Image from 'next/image';
import Link from 'next/link';

// make server comopnent async to call database
export default async function Home() {
  // fetch snippets from database
  const snippets = await db.snippet.findMany();

  return (
    <div>
      <div className="flex m-2 justify-between items-center">
        <h1 className="text-xl font-bold">Snippets</h1>
        <Link href="/snippets/new" className="border p-2 rounded">
          New
        </Link>
      </div>
      <div className="flex flex-col gap-2 p-2">
        {/* display snippets using map function */}
        {snippets.map((snippet) => (
          <Link
            key={snippet.id}
            href={`/snippets/${snippet.id}`}
            className="flex justify-between items-center p-2 border rounded"
          >
            <div>{snippet.title}</div>
            <div>View</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
