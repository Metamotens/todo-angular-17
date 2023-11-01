export interface Todo {
  id: string;
  name: string;
  checked: boolean;
}

export type CheckTodo = Omit<Todo, 'name'>;

export type RemoveTodo = Todo['id'];
