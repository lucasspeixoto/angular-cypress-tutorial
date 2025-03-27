import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/user' },
  {
    path: 'user',
    loadChildren: () =>
      import('./pages/user/user.routes').then((m) => m.USER_ROUTES),
  },
];
