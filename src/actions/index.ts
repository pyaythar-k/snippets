'use server';

import { db } from '@/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// create server actions for below form creation
export async function createSnippet(formData: FormData) {
  // // define 'server action'
  // 'use server';

  // check user input and validate
  const title = formData.get('title') as string;
  const code = formData.get('code') as string;

  // create new record in db
  const newSnippet = await db.snippet.create({
    data: {
      title,
      code,
    },
  });

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
