import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { TodoService } from '../shared/data-access/todo.service';

import { FormComponent } from '../shared/ui/form.component';
import { TodoItemComponent } from './ui/todo-item.component';
import { LoadingComponent } from '../shared/ui/loading.component';
import { TodoHeaderComponent } from './ui/todo-header.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    @defer (when loaded()) {
    <app-todo-header
      [todoCount]="todos().length"
      (openModal)="dialogRef.nativeElement.showModal()"
    />

    @for (todo of todos(); track todo .id) {
    <app-todo-item
      [todo]="todo"
      (remove)="todoService.remove$.next($event)"
      (toggleCheck)="todoService.toggleCheck$.next($event)"
    />
    } @empty {
    <span class="mx-auto">Todo list is empty, add new todo</span>
    } } @placeholder {
    <div class="flex h-[200px] items-center justify-center">
      <app-loading
        [class]="
          'w-16 h-16 text-gray-200 animate-spin dark:text-blue-600 fill-white'
        "
      />
    </div>
    } @error { Error }
    <dialog
      class="p-8 bg-gray-900 border border-1 rounded-md text-white"
      #dialog
    >
      <app-form
        [formGroup]="formGroup"
        [edit]="false"
        (save)="todoService.add$.next(formGroup.getRawValue())"
        (close)="dialogRef.nativeElement.close()"
      />
    </dialog>
  `,
  imports: [
    FormComponent,
    TodoItemComponent,
    LoadingComponent,
    TodoHeaderComponent,
  ],
  styles: `
  dialog:-internal-dialog-in-top-layer::backdrop {
    background: rgba(0, 0, 0, 0.5);
  }`,
})
export default class HomeComponent {
  @ViewChild('dialog') dialogRef!: ElementRef;

  todoService = inject(TodoService);
  formBuilder = inject(FormBuilder);

  todos = this.todoService.todos;
  loaded = this.todoService.loaded;
  error = this.todoService.error;

  formGroup = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required, Validators.min(1)]],
    description: [''],
  });
}
