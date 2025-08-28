import { spawn } from 'child_process';
import { defineConfig } from 'cypress';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { seedTodos } from './prisma/seed/todo';

export default defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      // 1. Skapa en in-memory databas (replica set prisma gnäller annars)
      const db = await MongoMemoryReplSet.create({ replSet: { count: 1 } });
      const dbUri = db.getUri('cypress-test');

      // 2. Starta Next.js servern (på en annan port ex. 3100, som ansluter till 1)
      const server = spawn(
        'npx',
        ['next', 'dev', '--turbopack', '-p', '3100'],
        {
          env: {
            NODE_ENV: 'test',
            DATABASE_URL: dbUri,
          },
          stdio: 'inherit',
        }
      );

      // 3. Vänta på att Next.js-servern är igång innan cypress kör vidare
      // 4. Städa upp processerna, det vill säga mongo-databasen och Next.js-servern
      // 5. Återså/reseed databasen så att testerna blir oberoende av varandra

      on('task', {
        async reseed() {
          await db.todo.deleteMany();
          await seedTodos();

          return null;
        },
      });
    },
  },
});
