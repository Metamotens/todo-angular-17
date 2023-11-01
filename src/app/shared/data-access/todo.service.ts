import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { CheckTodo, RemoveTodo, Todo } from '../interfaces/todo';
import { v4 as uuid } from 'uuid';
import { StorageService } from './storage.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, tap } from 'rxjs';

interface TodoState {
  todos: Todo[];
  loaded: boolean;
  error: string | null;
}

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly storageService = inject(StorageService);

  // initial state
  private state = signal<TodoState>({
    todos: [],
    loaded: false,
    error: null,
  });

  // selectors
  todos = computed(() => this.state().todos);
  loaded = computed(() => this.state().loaded);
  error = computed(() => this.state().error);

  // sources
  private taskListLoaded$ = this.storageService.loadTodos();
  add$ = new Subject<string>();
  edit$ = new Subject<Todo>();
  remove$ = new Subject<RemoveTodo>();
  toggleCheck$ = new Subject<CheckTodo>();

  constructor() {
    // reducers
    this.taskListLoaded$.pipe(takeUntilDestroyed()).subscribe({
      next: (todos) =>
        this.state.update((state) => ({ ...state, todos, loaded: true })),
      error: (error) => this.state.update((state) => ({ ...state, error })),
    });

    this.add$.pipe(takeUntilDestroyed()).subscribe((todoName) => {
      const todoIndex = this.todos().findIndex(
        (t) => t.name.toLowerCase() === todoName.toLowerCase()
      );

      if (todoIndex !== -1) {
        console.warn('Todo already exists!');
        return;
      }

      this.state.update((state) => ({
        ...state,
        todos: [...state.todos, { id: uuid(), name: todoName, checked: false }],
      }));
    });

    this.toggleCheck$
      .pipe(takeUntilDestroyed(), tap(console.log))
      .subscribe((checkTodo: CheckTodo) =>
        this.state.update((state) => ({
          ...state,
          todos: state.todos.map((todo) =>
            todo.id === checkTodo.id
              ? { ...todo, checked: checkTodo.checked }
              : todo
          ),
        }))
      );

    this.edit$.pipe(takeUntilDestroyed()).subscribe((todo: Todo) =>
      this.state.update((state) => ({
        ...state,
        todos: state.todos.map((t) =>
          t.id === todo.id ? { ...t, name: todo.name } : t
        ),
      }))
    );

    this.remove$.pipe(takeUntilDestroyed()).subscribe((id) =>
      this.state.update((state) => ({
        ...state,
        todos: state.todos.filter((todo: Todo) => todo.id !== id),
      }))
    );

    // effects
    effect(() => {
      if (this.loaded()) {
        this.storageService.saveTodos(this.todos());
      }
    });
  }
}
