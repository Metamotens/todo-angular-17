import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-todo-header',
  standalone: true,
  imports: [],
  template: `
    <div class="flex justify-between mb-4">
      <h1 class="text-3xl font-bold">TODOS - {{ todoCount }}</h1>
      <button
        type="button"
        class="px-4 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        (click)="openModal.emit(true)"
      >
        Add new
      </button>
    </div>
  `,
})
export class TodoHeaderComponent {
  @Input() todoCount!: number;
  @Output() openModal = new EventEmitter<boolean>();
}
