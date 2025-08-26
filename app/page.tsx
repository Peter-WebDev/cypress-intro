import { db } from "@/prisma/db";
import { Button } from "./ui/button";
import TodoList from "./ui/todo-list";

export default async function Home() {
  const todos = await db.todo.findMany();

  return (
    <main>
      <TodoList defaultTodos={todos} />
      <Button variant="primary">
        Post
      </Button>
    </main >
  );
}