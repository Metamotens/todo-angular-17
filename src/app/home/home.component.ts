import { Component, inject } from '@angular/core';
import { TodoService } from '../shared/data-access/todo.service';

import { TodoFormComponent } from './ui/todo-form.component';
import { TodoItemComponent } from './ui/todo-item.component';
import { LoadingComponent } from '../shared/ui/loading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    @defer (when loaded()) {
    <app-todo-form (add)="todoService.add$.next($event)" />
    <div class="flex flex-col p-2 mt-6 divide-y-[1px] divide-gray-700 w-hull">
      @for (todo of todos(); track todo .id) {
      <app-todo-item
        class="h-12"
        [todo]="todo"
        (edit)="todoService.remove$.next($event)"
        (remove)="todoService.remove$.next($event)"
        (toggleCheck)="todoService.toggleCheck$.next($event)"
      />
      } @empty {
      <span class="mx-auto">Todo list is empty, add new todo</span>
      }
    </div>
    } @placeholder {
    <app-loading
      [class]="
        'w-16 h-16 text-gray-200 animate-spin dark:text-blue-600 fill-white flex justify-center items-center'
      "
    />
    } @error { Error }
  `,
  imports: [TodoFormComponent, TodoItemComponent, LoadingComponent],
})
export default class HomeComponent {
  todoService = inject(TodoService);

  todos = this.todoService.todos;
  loaded = this.todoService.loaded;
  error = this.todoService.error;
}
