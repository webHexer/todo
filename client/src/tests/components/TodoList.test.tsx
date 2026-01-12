import { render, screen } from "@testing-library/react";
import TodoList from "../../components/TodoList";

const todos = [
  {
    id: "1",
    title: "Todo 1",
    completed: false,
    dueDate: "2026-01-12",
    createdAt: "2025-12-01",
  },
];

test("renders todos list", () => {
  render(
    <TodoList todos={todos} onComplete={jest.fn()} onDelete={jest.fn()} />
  );

  expect(screen.getByText("Todo 1")).toBeInTheDocument();
});
