import {
  fetchTodos,
  createTodo,
  deleteTodo,
  completeTodo,
} from "../../services/todoApi";

global.fetch = jest.fn();

describe("todoApi", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetchTodos calls GET /todos", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        status: "success",
        data: { todos: [] },
      }),
    });

    const result = await fetchTodos();

    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/todos");
    expect(result.data.todos).toEqual([]);
  });

  test("createTodo sends POST request", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ status: "success" }),
    });

    await createTodo("Test", "2026-01-12");

    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Test", dueDate: "2026-01-12" }),
    });
  });

  test("completeTodo sends PATCH request", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 204,
    });

    await completeTodo("1");

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/todos/1/complete",
      { method: "PATCH" }
    );
  });

  test("deleteTodo sends DELETE request", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        status: "success",
        message: "Todo deleted",
      }),
    });

    const result = await deleteTodo("123");

    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/todos/123", {
      method: "DELETE",
    });

    expect(result).toEqual({ message: "Todo deleted", status: "success" });
  });
});
