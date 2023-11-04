import { Injectable, computed, effect, inject, signal } from '@angular/core';
import {
  AddTodo,
  CheckTodo,
  EditTodo,
  RemoveTodo,
  Todo,
} from '../interfaces/todo';
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
  add$ = new Subject<AddTodo>();
  edit$ = new Subject<EditTodo>();
  remove$ = new Subject<RemoveTodo>();
  toggleCheck$ = new Subject<CheckTodo>();

  constructor() {
    // reducers
    this.taskListLoaded$.pipe(takeUntilDestroyed()).subscribe({
      next: (todos) =>
        this.state.update((state) => ({ ...state, todos, loaded: true })),
      error: (error) => this.state.update((state) => ({ ...state, error })),
    });

    this.add$.pipe(takeUntilDestroyed()).subscribe((addTodo: AddTodo) => {
      const todoIndex = this.todos().findIndex(
        (t) => t.title.toLowerCase() === addTodo.title.toLowerCase()
      );

      if (todoIndex !== -1) {
        console.warn('Todo already exists!');
        return;
      }

      this.state.update((state) => ({
        ...state,
        todos: [
          ...state.todos,
          {
            id: uuid(),
            title: addTodo.title,
            description: addTodo.description,
            checked: false,
          },
        ],
      }));
    });

    this.toggleCheck$
      .pipe(takeUntilDestroyed())
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

    this.edit$.pipe(takeUntilDestroyed()).subscribe((editTodo: EditTodo) =>
      this.state.update((state) => ({
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === editTodo.id
            ? {
                ...todo,
                title: editTodo.title,
                description: editTodo.description,
              }
            : todo
        ),
      }))
    );

    this.remove$.pipe(takeUntilDestroyed()).subscribe((id: RemoveTodo) =>
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
