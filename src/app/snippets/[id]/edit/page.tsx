import SnippetEditForm from '@/components/snippet-edit-form';
import { db } from '@/db';
import { notFound } from 'next/navigation';

// type safety for params
interface Props {
  params: {
    id: string;
  };
}
export default async function Page(props: Props) {
  // assign id from params and name as snippetId
  const { id: snippetId } = props.params;

  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(snippetId) },
  });

  if (!snippet) {
    notFound();
  }

  return (
    <div>
      <SnippetEditForm snippet={snippet} />
    </div>
  );
}
