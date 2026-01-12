// src/services/todoApi.ts
import { TodosResponse, Todo } from "../types/todo";

const API_BASE = "http://localhost:3000/todos";

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    let message = "Something went wrong";
    try {
      const error = await res.json();
      message = error.message || message;
    } catch {}
    throw new Error(message);
  }

  // 204 No Content
  if (res.status === 204) return null;

  return res.json();
};

export const fetchTodos = async (): Promise<TodosResponse> => {
  const res = await fetch(API_BASE);
  return handleResponse(res);
};

export const createTodo = async (title: string, dueDate: string) => {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, dueDate }),
  });
  return handleResponse(res);
};

export const updateTodo = async (id: string, data: Partial<Todo>) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const completeTodo = async (id: string) => {
  const res = await fetch(`${API_BASE}/${id}/complete`, {
    method: "PATCH",
  });
  return handleResponse(res);
};

export const deleteTodo = async (id: string) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res);
};
