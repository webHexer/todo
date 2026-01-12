import type { Todo } from '../types/todo';

module.exports.createTodo = (title: string, dueDate: string): Todo => ({
  id: Date.now().toString(),
  title,
  dueDate,
  completed: false,
  createdAt: new Date().toISOString()
});
