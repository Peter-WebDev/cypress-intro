import { spawn } from 'child_process';
import { defineConfig } from 'cypress';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import waitOn from 'wait-on';
import { db } from './prisma/db';
import { seedTodos } from './prisma/seed/todo';

export default defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      // 1. Skapa en in-memory databas (replica set prisma gnäller annars)
      const mongo = await MongoMemoryReplSet.create({
        replSet: { count: 1 },
      });
      const dbUri = mongo.getUri('cypress-test');

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
      await waitOn({ resources: ['http://localhost:3100'], timeout: 60_000 });

      // 4. Städa upp processerna, det vill säga mongo-databasen och Next.js-servern
      const cleanup = async () => {
        server.kill();
        await mongo.stop();
      };
      process.on('exit', cleanup);

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
