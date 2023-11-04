import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: ` <main
    class="bg-gray-900 text-white min-h-screen flex items-center justify-center"
  >
    <section
      class="flex flex-col justify-center items-center p-8 border border-1 rounded-md bg-gray-800 w-[650px] my-8"
    >
      <article class="w-full min-h-[200px]">
        <router-outlet />
      </article>
    </section>
  </main>`,
})
export class AppComponent {}
