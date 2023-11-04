import { Component, Input, computed, effect, inject } from '@angular/core';
import { FormComponent } from '../shared/ui/form.component';
import { TodoService } from '../shared/data-access/todo.service';
import { LoadingComponent } from '../shared/ui/loading.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [FormComponent, LoadingComponent],
  template: ` @defer (when todo()) {
    <app-form
      [formGroup]="formGroup"
      [edit]="true"
      (save)="
        todoService.edit$.next({
          id: id,
          title: formGroup.getRawValue().title,
          description: formGroup.getRawValue().description
        })
      "
    />
    } @placeholder {
    <div class="flex h-[600px] items-center justify-center">
      <app-loading
        [class]="
          'w-16 h-16 text-gray-200 animate-spin dark:text-blue-600 fill-white'
        "
      />
    </div>
    } @error {
    <p>Could not find todo..</p>
    }`,
})
export default class DetailComponent {
  @Input() id!: string;

  todoService = inject(TodoService);
  formBuilder = inject(FormBuilder);

  todo = computed(() =>
    this.todoService.todos().find((todo) => todo.id === this.id)
  );

  formGroup = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required, Validators.min(1)]],
    description: [''],
  });

  constructor() {
    effect(() =>
      this.formGroup.patchValue({
        title: this.todo()?.title,
        description: this.todo()?.description,
      })
    );
  }
}
