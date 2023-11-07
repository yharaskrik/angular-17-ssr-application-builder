import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'sub-page',
  standalone: true,
  template: `sub page`,
})
export class SubPageComponent {
  constructor() {
    inject(Auth);
  }
}
