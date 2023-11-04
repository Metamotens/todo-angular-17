export interface Todo {
  id: string;
  title: string;
  description: string;
  checked: boolean;
}

export type AddTodo = Pick<Todo, 'title' | 'description'>;

export type CheckTodo = Pick<Todo, 'id' | 'checked'>;

export type EditTodo = Omit<Todo, 'checked'>;

export type RemoveTodo = Todo['id'];
