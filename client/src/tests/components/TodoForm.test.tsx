import { render, screen, fireEvent } from "@testing-library/react";
import TodoForm from "../../components/TodoForm";

test("submits todo with title and due date", () => {
  const onAdd = jest.fn();

  render(<TodoForm onAdd={onAdd} />);

  fireEvent.change(screen.getByLabelText(/title/i), {
    target: { value: "New Todo" },
  });

  fireEvent.change(screen.getByLabelText(/due date/i), {
    target: { value: "2026-01-12" },
  });

  fireEvent.click(screen.getByRole("button", { name: /add todo/i }));

  expect(onAdd).toHaveBeenCalledWith("New Todo", "2026-01-12");
});
