"use client";

import { Todo } from "../../generated/prisma";
import { deleteTodo } from "../actions";

interface Props {
    todos: Todo[];
}

export default function TodoList({ todos }: Props) {

    return (
        <ul className="space-y-2">
            {todos.map((t) => (
                <li key={t.id} className="flex items-center justify-between p-2 border rounded">
                    <p>{t.text}</p>
                    <form action={deleteTodo.bind(null, t.id)}>
                        <button type="submit">
                            🗑️
                        </button>
                    </form>
                </li>
            ))}
        </ul>
    );
}