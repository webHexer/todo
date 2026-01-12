import { render, screen, fireEvent } from "@testing-library/react";
import TodoItem from "../../components/TodoItem";
import { on } from "events";

const todo = {
  id: "1",
  title: "Buy Groceries",
  completed: false,
  dueDate: "2026-01-12",
  createdAt: "2025-12-01",
};

describe("TodoItem Component", () => {
  test("renders todo title", () => {
    render(
      <TodoItem todo={todo} onComplete={jest.fn()} onDelete={jest.fn()} />
    );

    expect(screen.getByText("Buy Groceries")).toBeInTheDocument();
  });

  test("calls onComplete when complete button clicked", () => {
    const onComplete = jest.fn();
    const onDelete = jest.fn();

    render(
      <TodoItem todo={todo} onComplete={onComplete} onDelete={onDelete} />
    );

    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);

    expect(onComplete).toHaveBeenCalledWith(todo.id);
  });

  test("calls onDelete when delete button clicked", () => {
    const onComplete = jest.fn();
    const onDelete = jest.fn();

    render(
      <TodoItem todo={todo} onComplete={onComplete} onDelete={onDelete} />
    );

    const deleteButton = screen.getByRole("button");

    fireEvent.click(deleteButton);

    expect(onDelete).toHaveBeenCalledWith(todo.id);
  });
});
