import { Component, inject } from '@angular/core';
import { TodoService } from '../shared/data-access/todo.service';

import { TodoFormComponent } from './ui/todo-form.component';
import { TodoItemComponent } from './ui/todo-item.component';
import { LoadingComponent } from '../shared/ui/loading.component';

@Component({
  selector: 'home',
  standalone: true,
  template: `
    <section
      class="flex flex-col justify-center items-center p-8 border border-1 rounded-md bg-gray-800 w-[650px] my-8"
    >
      <h1 class="text-3xl font-bold mb-8">TODOS App</h1>
      <article class="w-full min-h-[600px]">
        @defer (when loaded()) {
        <todo-form (add)="todoService.add$.next($event)" />
        <article class="flex flex-col p-2 mt-6 divide-y-[1px] divide-gray-700">
          @for (todo of todos(); track todo.id) {
          <todo-item
            class="h-12"
            [todo]="todo"
            (edit)="todoService.remove$.next($event)"
            (remove)="todoService.remove$.next($event)"
            (toggleCheck)="todoService.toggleCheck$.next($event)"
          />
          } @empty {
          <span class="mx-auto">Todo list is empty, add new todo</span>
          }
        </article>
        } @placeholder {
        <div class="flex justify-center items-center h-4/5">
          <loading
            [class]="
              'w-16 h-16 text-gray-200 animate-spin dark:text-blue-600 fill-white'
            "
          />
        </div>
        } @error { Error }
      </article>
    </section>
  `,
  imports: [TodoFormComponent, TodoItemComponent, LoadingComponent],
})
export default class HomeComponent {
  todoService = inject(TodoService);

  todos = this.todoService.todos;
  loaded = this.todoService.loaded;
  error = this.todoService.error;
}
