import { render, screen, fireEvent } from "@testing-library/react";
import TodoItem from "../../components/TodoItem";

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
      <TodoItem
        todo={todo}
        onEdit={jest.fn()}
        onComplete={jest.fn()}
        onDelete={jest.fn()}
      />
    );

    expect(screen.getByText("Buy Groceries")).toBeInTheDocument();
  });

  test("calls onComplete when complete button clicked", () => {
    const onComplete = jest.fn();
    const onDelete = jest.fn();
    const onEdit = jest.fn();

    render(
      <TodoItem
        todo={todo}
        onEdit={onEdit}
        onComplete={onComplete}
        onDelete={onDelete}
      />
    );

    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);

    expect(onComplete).toHaveBeenCalledWith(todo.id);
  });

  test("calls onDelete when delete button clicked", () => {
    const onComplete = jest.fn();
    const onDelete = jest.fn();
    const onEdit = jest.fn();

    render(
      <TodoItem
        todo={todo}
        onEdit={onEdit}
        onComplete={onComplete}
        onDelete={onDelete}
      />
    );

    const deleteButton = screen.getAllByRole("button");

    fireEvent.click(deleteButton[1]); // Second button is delete

    expect(onDelete).toHaveBeenCalledWith(todo.id);
  });
});
