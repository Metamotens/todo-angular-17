import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CheckTodo, Todo } from '../../shared/interfaces/todo';

@Component({
  selector: 'todo-item',
  standalone: true,
  template: `
    <div class="flex justify-between items-center h-full space-x-2">
      <div class="flex items-center">
        <input
          type="checkbox"
          [checked]="todo.checked"
          (change)="toggleCheck.emit({ id: todo.id, checked: !todo.checked })"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          for="default-checkbox"
          class="ml-2 font-medium text-gray-900 dark:text-gray-300"
          >{{ todo.name }}</label
        >
      </div>
      <div class="space-x-2">
        <button
          type="button"
          class="
            'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center mr-2'
          "
          (click)="edit.emit(todo.id)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-edit"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"
            ></path>
            <path
              d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"
            ></path>
            <path d="M16 5l3 3"></path>
          </svg>
        </button>
        <button
          type="button"
          class="
            'text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center mr-2'
          "
          (click)="remove.emit(todo.id)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-trash"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 7l16 0"></path>
            <path d="M10 11l0 6"></path>
            <path d="M14 11l0 6"></path>
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
          </svg>
        </button>
      </div>
    </div>
  `,
  imports: [],
})
export class TodoItemComponent {
  @Input({ required: true }) todo!: Todo;
  @Output() edit = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();
  @Output() toggleCheck = new EventEmitter<CheckTodo>();
}
