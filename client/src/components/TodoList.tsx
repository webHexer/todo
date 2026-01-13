import type { Todo, TodoListProps } from "../types/todo";
import { List } from "@mui/material";
import TodoItem from "./TodoItem";

export default function TodoList({
  todos,
  onComplete,
  onDelete,
  onEdit,
}: TodoListProps) {
  return (
    <List>
      {todos?.map((todo: Todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onComplete={() => onComplete(todo.id)}
          onEdit={() => onEdit(todo)}
          onDelete={() => onDelete(todo.id)}
        />
      ))}
    </List>
  );
}
