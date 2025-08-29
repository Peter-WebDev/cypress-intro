import { spawn } from 'child_process';
import { defineConfig } from 'cypress';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import waitOn from 'wait-on';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3100',
    async setupNodeEvents(on) {
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
          shell: true,
          env: {
            ...process.env,
            NODE_ENV: 'test',
            DATABASE_URL: dbUri,
          },
          stdio: 'inherit',
        }
      );

      // 3. Vänta på att Next.js-servern är igång innan cypress kör vidare
      await waitOn({ resources: ['http://localhost:3100'], timeout: 60_000 });

      // 4. Städa upp processerna, det vill säga mongo-databasen och Next.js-servern
      const cleanup = () => {
        server.kill();
        mongo.stop();
      };
      on('after:run', cleanup);
      process.on('SIGINT', cleanup);
      process.on('SIGTERM', cleanup);
      process.on('SIGBREAK', cleanup);
      process.on('exit', cleanup);

      // 5. Återså/reseed databasen så att testerna blir oberoende av varandra
      process.env.DATABASE_URL = dbUri;
      on('task', {
        async reseed() {
          const { db } = await import('./prisma/db');
          const { seedTodos } = await import('./prisma/seed/todo');
          await db.todo.deleteMany();
          await seedTodos();

          return null;
        },
      });
    },
  },
});
