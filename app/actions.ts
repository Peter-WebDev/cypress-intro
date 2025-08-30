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
  // Parse formData using zod zchema

  // Check if parsing failed

  // If sucessful, destructure the valid data

  // Create the database record

  // Update page
  revalidatePath('/');
}

export async function getTopGameResults() {
  const toplist = await db.gameResult.findMany({
    // Add parameters
  });
  return toplist;
}
