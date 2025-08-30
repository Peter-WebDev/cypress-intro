import { db } from '../db';
import { seedAssets } from './asset';

async function main() {
  await seedAssets();
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
