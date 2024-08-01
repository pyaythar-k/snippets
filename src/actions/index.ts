'use server';

import { db } from '@/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// create server actions for below form creation
export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  // check user input and validate
  const title = formData.get('title');
  const code = formData.get('code');

  if (typeof title !== 'string' || title.length < 3) {
    return {
      message: 'Title must be longer',
    };
  }
  if (typeof code !== 'string' || code.length < 3) {
    return {
      message: 'Code must be longer',
    };
  }
  try {
    // create new record in db
    const newSnippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    } else {
      return {
        message: 'Something went wrong...',
      };
    }
  }

  revalidatePath('/');
  //redirect user
  redirect('/');
}

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code },
  });

  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });

  revalidatePath('/');
  redirect(`/`);
}
