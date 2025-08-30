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

export async function addGameResult(formData: FormData) {
  // Extract data from form
  const data = {
    name: formData.get('name'),
    time: formData.get('time'),
    attempts: formData.get('attempts'),
    categoryId: formData.get('categoryId'),
  };

  // Use safeParse to validate the data
  const parsed = gameResultSchema.safeParse(data);

  // Check if parsing failed
  if (!parsed.success) {
    const errors = z.treeifyError(parsed.error);
    console.error('Validation error:', errors);
    return {
      error: 'Invalid data',
      issues: errors,
    };
  }

  // If successful, destructure the valid data
  const { name, time, attempts, categoryId } = parsed.data;

  // Create the database record
  await db.gameResult.create({
    data: {
      name,
      time,
      attempts,
      categoryId,
    },
  });

  // Update page
  revalidatePath('/');
  return { success: true };
}

export async function getTopGameResults() {
  const toplist = await db.gameResult.findMany({
    // Add parameters
  });
  return toplist;
}
