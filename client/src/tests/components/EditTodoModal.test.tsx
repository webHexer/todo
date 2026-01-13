import { render, screen, fireEvent } from "@testing-library/react";
import EditTodoModal from "../../components/EditTodoModal";

describe("EditTodoModal testcases", () => {
  const defaultProps = {
    open: true,
    todo: {
      id: "1",
      title: "Test Todo",
      dueDate: "2026-01-15",
      completed: false,
      createdAt: "2026-01-01",
    },
    onClose: jest.fn(),
    onSave: jest.fn(),
  };

  test("renders dialog when open", () => {
    render(<EditTodoModal {...defaultProps} />);

    expect(screen.getByText("Edit Todo")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Todo")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2026-01-15")).toBeInTheDocument();
  });

  test("calls onClose when Cancel is clicked", () => {
    render(<EditTodoModal {...defaultProps} />);

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  test("calls onSave when Save is clicked", () => {
    render(<EditTodoModal {...defaultProps} />);

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(defaultProps.onSave).toHaveBeenCalledWith(
      "1",
      "Test Todo",
      "2026-01-15"
    );
  });

  test("does not render dialog when open=false", () => {
    render(<EditTodoModal {...defaultProps} open={false} />);

    expect(screen.queryByText("Edit Todo")).not.toBeInTheDocument();
  });
});
