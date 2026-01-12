import { Todo } from "../types/todo";

const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../data/todos.json");

const readTodos = async () => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    // File doesn't exist → return empty array
    return [];
  }
};

const writeTodos = async (todos: Todo) => {
  await fs.writeFile(filePath, JSON.stringify(todos, null, 2));
};

module.exports = {
  readTodos,
  writeTodos,
};
