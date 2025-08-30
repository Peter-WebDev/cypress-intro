'use server';

import { db } from '@/prisma/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const gameResultSchema = z.object({
  name: z.string().min(3, {
    message: 'Name must be at least 3 characters long',
  }),
  time: z.coerce.number().int().positive(),
  attempts: z.coerce.number().int().positive(),
  categoryId: z.string().min(1),
});

export async function addTodo(formData: FormData) {
  const text = formData.get('text') as string;

  if (!text.trim()) return;

  await db.asset.create({
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
