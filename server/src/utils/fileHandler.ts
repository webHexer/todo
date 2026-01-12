import { Todo } from "../types/todo";

const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../data/todos.json");

module.exports.readTodos = async (): Promise<Todo[]> => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data) as Todo[];
  } catch (error: any) {
    // File not found → return empty list
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
};

module.exports.writeTodos = async (todos: Todo[]): Promise<void> => {
  try {
    await fs.writeFile(filePath, JSON.stringify(todos, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to write todos:", error);
    throw error;
  }
};
