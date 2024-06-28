import { Routes } from '@angular/router';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { UserResolve } from './resolver/user.resolver';

export const routes: Routes = [
  {
    path: '',
    // component: UserListComponent
    loadComponent: () =>
      import('./pages/user/user-list/user-list.component').then(
        (m) => m.UserListComponent
      ),
  },
  {
    path: ':userId',
    loadComponent: () =>
      import('./pages/user/user-details/user-details.component').then(
        (m) => m.UserDetailsComponent
      ),
    // resolve: {
    //   user: UserResolve,
    // },
  },
];
