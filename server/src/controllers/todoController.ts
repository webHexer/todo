import type { Request, Response } from "express";
const { readTodos, writeTodos } = require("../utils/fileHandler");
const { createTodo } = require("../models/todoModel");

const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await readTodos();

    res.status(200).json({
      status: "success",
      results: todos.length,
      data: { todos },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to read todos" });
  }
};

const addTodo = async (req: Request, res: Response) => {
  try {
    const { title, dueDate } = req.body;

    const titleRegex = /^(?=.*[A-Za-z0-9])[A-Za-z0-9 ]+$/;

    if (!titleRegex.test(title)) {
      return res.status(400).json({
        message:
          "Title must contain only letters and numbers and cannot be empty",
      });
    }
    if (!dueDate) {
      return res.status(400).json({ message: "Due date is required" });
    }

    const todos = await readTodos();
    const newTodo = createTodo(title, dueDate);

    todos.push(newTodo);
    await writeTodos(todos);

    res.status(201).json({
      status: "success",
      data: newTodo,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to add todo" });
  }
};

const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, completed, dueDate } = req.body;

    const todos = await readTodos();
    const index = todos.findIndex((todo: any) => todo.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todos[index] = {
      ...todos[index],
      title: title ?? todos[index].title,
      dueDate: dueDate ?? todos[index].dueDate,
    };

    await writeTodos(todos);

    res.status(200).json({
      status: "success",
      data: { todos: todos[index] },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update todo" });
  }
};

const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const todos = await readTodos();
    const filteredTodos = todos.filter((todo: any) => todo.id !== id);

    if (todos.length === filteredTodos.length) {
      return res.status(404).json({ message: "Todo not found" });
    }

    await writeTodos(filteredTodos);
    res.status(200).json({
      status: "success",
      message: "Todo deleted",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete todo" });
  }
};

const completeTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const todos = await readTodos();
    const index = todos.findIndex((todo: any) => todo.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todos[index].completed = true;

    await writeTodos(todos);

    res.status(200).json({
      status: "success",
      data: {
        todo: todos[index],
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to complete todo" });
  }
};

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  completeTodo,
};
