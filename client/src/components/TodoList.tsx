import type { Todo } from "../types/todo";
import { List } from "@mui/material";
import TodoItem from "./TodoItem";

interface Props {
  todos?: Todo[];
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onComplete, onDelete }: Props) {
  return (
    <List>
      {todos?.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onComplete={() => onComplete(todo.id)}
          onDelete={() => onDelete(todo.id)}
        />
      ))}
    </List>
  );
}
