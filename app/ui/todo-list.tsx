"use client";

import { useState } from "react";
import { Todo } from "../../generated/prisma";

interface Props {
    defaultTodos: Todo[];
}

export default function TodoList({ defaultTodos }: Props) {
    const [todos, setTodos] = useState(defaultTodos);

    return (
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
    );
}