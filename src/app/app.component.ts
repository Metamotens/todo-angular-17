import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `<main
    class="bg-gray-900 text-white min-h-screen flex items-center justify-center"
  >
    <router-outlet />
  </main>`,
})
export class AppComponent {}
