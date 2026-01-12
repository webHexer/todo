export type Todo = {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
  createdAt: string;
};

export type TodosResponse = {
  data: {
    todos: Todo[];
  };
};

export interface ResponseProps {
  todos?: TodosResponse;
}
