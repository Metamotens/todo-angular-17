import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TitleCasePipe],
  template: `<form [formGroup]="formGroup" (ngSubmit)="save.emit()">
    @for (control of formGroup.controls | keyvalue; track control.key) {
    <div class="mb-6">
      <label for="title" class="block mb-2 text-sm font-medium text-white">{{
        control.key | titlecase
      }}</label>
      <input
        type="text"
        [formControlName]="control.key"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
    }
    <div class="w-full flex justify-between">
      @if (edit) {
      <button
        type="button"
        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        routerLink=".."
      >
        Go back
      </button>
      <button
        type="submit"
        class="w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        [ngClass]="
          formGroup.valid
            ? 'bg-blue-700'
            : 'bg-blue-400 dark:bg-blue-500 cursor-not-allowed'
        "
        [disabled]="!formGroup.valid"
      >
        Update
      </button>
      } @else {
      <button
        type="button"
        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        (click)="close.emit()"
      >
        Close
      </button>
      <button
        type="submit"
        class="w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        [ngClass]="
          formGroup.valid
            ? 'bg-blue-700'
            : 'bg-blue-400 dark:bg-blue-500 cursor-not-allowed'
        "
        [disabled]="!formGroup.valid"
      >
        Create
      </button>
      }
    </div>
  </form>`,
})
export class FormComponent {
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) edit!: boolean;
  @Output() save = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
}
