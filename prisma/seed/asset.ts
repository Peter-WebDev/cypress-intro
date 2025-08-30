import { Asset, Category } from '@/generated/prisma';
import { db } from '../db';

const categoryName = 'Animals';

// Use the Asset type for type-safety
const mockedAssets: Pick<Asset, 'imageUrl'>[] = [
  { imageUrl: 'https://placehold.co/100x100/png?text=Cat' },
  { imageUrl: 'https://placehold.co/100x100/png?text=Dog' },
  { imageUrl: 'https://placehold.co/100x100/png?text=Bird' },
  { imageUrl: 'https://placehold.co/100x100/png?text=Fish' },
  { imageUrl: 'https://placehold.co/100x100/png?text=Rabbit' },
  { imageUrl: 'https://placehold.co/100x100/png?text=Horse' },
  { imageUrl: 'https://placehold.co/100x100/png?text=Cow' },
  { imageUrl: 'https://placehold.co/100x100/png?text=Pig' },
];

export async function seedAssets() {
  console.log('Seeding assets...');

  const category: Category = await db.category.upsert({
    where: { name: categoryName },
    update: {},
    create: { name: categoryName },
  });

  for (const mockedAsset of mockedAssets) {
    await db.asset.upsert({
      where: { imageUrl: mockedAsset.imageUrl },
      update: {},
      create: {
        imageUrl: mockedAsset.imageUrl,
        categoryId: category.id,
      },
    });
  }

  console.log('Assets seeded successfully');
}
