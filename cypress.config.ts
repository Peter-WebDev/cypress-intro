import { defineConfig } from 'cypress';
import { db } from './prisma/db';
import { seedTodos } from './prisma/seed/todo';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        // 1. Skapa en in-memory databas (replica set prisma gnäller annars)
        // 2. Starta Next.js servern (på en annan port ex. 3100, som ansluter till 1)
        // 3. Vänta på att Next.js-servern är igång innan cypress kör vidare
        // 4. Städa upp processerna, det vill säga mongo-databasen och Next.js-servern
        // 5. Återså/reseed databasen så att testerna blir oberoende av varandra

        async reseed() {
          await db.todo.deleteMany();
          await seedTodos();

          return null;
        },
      });
    },
  },
});
