import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import { EditTodoModalProps } from "../types/todo";

export default function EditTodoModal({
  open,
  todo,
  onClose,
  onSave,
}: EditTodoModalProps) {
  const [title, setTitle] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDueDate(todo.dueDate);
      setError("");
    }
  }, [todo]);

  const handleSave = (): void => {
    const titleRegex = /^(?=.*[A-Za-z0-9])[A-Za-z0-9 ]+$/;

    if (!title) {
      return setError("Title is required");
    }

    if (!titleRegex.test(title)) {
      return setError("Only letters and numbers are allowed");
    }

    if (!dueDate) {
      return setError("Due date is required");
    }

    onSave(todo!.id, title, dueDate);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Todo</DialogTitle>

      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="Due Date"
          type="date"
          fullWidth
          margin="normal"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
