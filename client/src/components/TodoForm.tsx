import { useState } from "react";
import { Button, TextField, Paper, Stack } from "@mui/material";
import type { TodoFormProps } from "../types/todo";

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");

  const handleButtonClick = (): void => {
    onAdd(title, dueDate);
    setTitle("");
    setDueDate("");
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          type="date"
          label="Due Date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            minWidth: { sm: 120 },
            height: { sm: 56 },
          }}
          onClick={handleButtonClick}
        >
          Add Todo
        </Button>
      </Stack>
    </Paper>
  );
}
