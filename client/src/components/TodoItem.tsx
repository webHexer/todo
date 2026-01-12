import type { Todo } from "../types/todo";
import { Checkbox, IconButton, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  todo: Todo;
  onComplete: () => void;
  onDelete: () => void;
}

export default function TodoItem({ todo, onComplete, onDelete }: Props) {
  const today = new Date();
  const due = new Date(todo.dueDate);

  let bg = "#f5f5f5";
  if (todo.completed) bg = "#d1fae5";
  else if (due < today) bg = "#fee2e2";

  return (
    <ListItem
      sx={{
        background: bg,
        mb: 1,
      }}
      secondaryAction={
        <IconButton edge="end" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <Checkbox
        checked={todo.completed}
        disabled={todo.completed}
        onChange={onComplete}
      />
      <ListItemText primary={todo.title} secondary={`Due: ${todo.dueDate}`} />
    </ListItem>
  );
}
