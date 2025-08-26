import { db } from './db';

async function main() {
  const todos = await db.todo.findMany();
  console.log(todos);
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
