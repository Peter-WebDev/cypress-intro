'use server';

import { db } from '@/prisma/db';
import { revalidatePath } from 'next/cache';

export async function addTodo(formData: FormData) {
  const text = formData.get('text') as string;

  if (!text.trim()) return;

  await db.todo.create({
    data: { text: text.trim() },
  });

  // Update page
  revalidatePath('/');
}

export async function deleteTodo(id: string) {
  await db.todo.delete({
    where: { id },
  });

  // Update page
  revalidatePath('/');
}
