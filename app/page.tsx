import { db } from "@/prisma/db";
import { TodoForm } from "./ui/todo-form";
import TodoList from "./ui/todo-list";

export default async function Home() {
  const todos = await db.todo.findMany();

  return (
    <main>
      <h1 className="text-2xl font-bold mb-6">Todo App</h1>
      <TodoList todos={todos} />
      <TodoForm />
    </main >
  );
}