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
export interface TodoItemProps {
  todo: Todo;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}
export interface TodoFormProps {
  onAdd: (title: string, dueDate: string) => void;
}
export interface TodoListProps {
  todos?: Todo[];
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

export interface EditTodoModalProps {
  open: boolean;
  todo: Todo | null;
  onClose: () => void;
  onSave: (id: string, title: string, dueDate: string) => void;
}
