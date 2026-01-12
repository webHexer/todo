import { useEffect, useState } from "react";
import { Container, Typography, Alert } from "@mui/material";
import {
  fetchTodos,
  createTodo,
  completeTodo,
  deleteTodo,
} from "./services/todoApi";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { Todo } from "./types/todo";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchTodos();
      setTodos(response.data.todos);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const addButtonClickHandler = async (title: string, dueDate: string) => {
    try {
      // regex to allow only letters and numbers in title
      const titleRegex = /^(?=.*[A-Za-z0-9])[A-Za-z0-9 ]+$/;

      // validate title and dueDate
      if (!titleRegex.test(title)) {
        throw new Error(
          "Title must contain only letters and numbers and cannot be empty"
        );
      }
      if (!dueDate) {
        throw new Error("Due date is required");
      }

      // create todo and reload todos
      await createTodo(title, dueDate);
      await loadTodos();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const completeButtonClickHandler = async (id: string) => {
    try {
      await completeTodo(id);
      await loadTodos();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const onDeleteButtonClickHandler = async (id: string) => {
    try {
      await deleteTodo(id);
      await loadTodos();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Todo List
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TodoForm onAdd={addButtonClickHandler} />

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <TodoList
          todos={todos}
          onComplete={completeButtonClickHandler}
          onDelete={onDeleteButtonClickHandler}
        />
      )}
    </Container>
  );
}
