import { addTodo } from "../actions";
import { Button } from "./button";

export function TodoForm() {
    return (
        <form action={addTodo} className="mb-6">
            <div className="flex gap-2">
                <input
                    name="text"
                    type="text"
                    placeholder="Add new todo"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
                <Button type="submit" variant="primary">
                    Add todo
                </Button>
            </div>
        </form>
    )
}