import type { TodoItemProps } from "../types/todo";
import { Checkbox, IconButton, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TodoItem({
  todo,
  onComplete,
  onDelete,
}: TodoItemProps) {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const due = todo.dueDate;

  const getColor = (): string => {
    if (todo.completed) return "#d1fae5";
    if (due === today) return "#fef3c7";
    if (due < today) return "#fee2e2";
    return "#f5f5f5";
  };
  const bg: string = getColor();

  return (
    <ListItem
      sx={{
        background: bg,
        mb: 1,
      }}
      secondaryAction={
        <IconButton edge="end" onClick={() => onDelete(todo.id)}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <Checkbox
        checked={todo.completed}
        disabled={todo.completed}
        onChange={() => onComplete(todo.id)}
      />
      <ListItemText primary={todo.title} secondary={`Due: ${todo.dueDate}`} />
    </ListItem>
  );
}
