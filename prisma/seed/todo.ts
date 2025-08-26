import { Todo } from '@/generated/prisma';
import { db } from '../db';

export async function seedTodos() {
  const mockedTodos: Todo[] = [
    {
      id: '68adb3310c2c50f13d0a64ff',
      text: 'Feed the cat',
    },
    {
      id: '68adb3310c2c50f13d0a6500',
      text: 'Help the dog',
    },
    {
      id: '68adb3310c2c50f13d0a6501',
      text: 'Walk all the cats',
    },
  ];

  for (const { id, ...todo } of mockedTodos) {
    await db.todo.upsert({
      where: { id },
      update: todo,
      create: { id, ...todo },
    });
  }
}
