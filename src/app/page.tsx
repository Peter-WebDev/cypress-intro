'use client'
import { useState } from "react";

interface Todo {
  id: string;
  text: string;
}

const mockedTodos: Todo[] = [
  {
    id: "1",
    text: "Feed the cat",
  },
  {
    id: "2",
    text: "Help the dog",
  },
  {
    id: "3",
    text: "Walk all the cats",
  },
];

export default function Home() {
  const [todos, setTodos] = useState(mockedTodos);

  return (
    <main>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <p>{t.text}</p>
            <button onClick={() => setTodos(todos.filter(({ id }) => id !== t.id))}>
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </main >
  );
}
