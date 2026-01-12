import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import { fetchTodos, completeTodo } from "../services/todoApi";

jest.mock("../services/todoApi");

describe("App Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // loadTodos tests
  test("loads and displays todos", async () => {
    (fetchTodos as jest.Mock).mockResolvedValue({
      data: {
        todos: [{ id: "1", title: "Mock Todo", completed: false }],
      },
    });

    render(<App />);

    await waitFor(() =>
      expect(screen.getByText("Mock Todo")).toBeInTheDocument()
    );
  });

  test("shows error on API failure", async () => {
    (fetchTodos as jest.Mock).mockRejectedValue(new Error("Network error"));

    render(<App />);

    await waitFor(() =>
      expect(screen.getByText(/network error/i)).toBeInTheDocument()
    );
  });

  //completeButtonClickHandler test for successfull response
  test("calls completeTodo when complete button clicked", async () => {
    (fetchTodos as jest.Mock).mockResolvedValue({
      data: {
        todos: [{ id: "1", title: "Todo 1", completed: false }],
      },
    });
    (completeTodo as jest.Mock).mockResolvedValue({ status: "success" });
    (fetchTodos as jest.Mock).mockResolvedValueOnce({
      data: {
        todos: [{ id: "1", title: "Todo 1", completed: true }],
      },
    });

    render(<App />);

    // Wait for todo to appear
    await waitFor(() => {
      expect(screen.getByText("Todo 1")).toBeInTheDocument();
    });

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(completeTodo).toHaveBeenCalledWith("1");
    });
  });
});
