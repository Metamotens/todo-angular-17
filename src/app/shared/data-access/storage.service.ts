import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { Todo } from '../interfaces/todo';

const STORAGE_NAME = 'todos';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  loadTodos(): Observable<Todo[]> {
    const todos = localStorage.getItem(STORAGE_NAME);
    return of(todos ? JSON.parse(todos) : []).pipe(delay(1000));
  }

  saveTodos(todos: Todo[]): void {
    localStorage.setItem(STORAGE_NAME, JSON.stringify(todos));
  }
}
