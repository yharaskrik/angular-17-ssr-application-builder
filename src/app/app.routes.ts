import { type Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./sub-page.component').then((m) => m.SubPageComponent),
  },
];
