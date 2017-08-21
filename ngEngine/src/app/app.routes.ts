import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';

export const ROUTER_CONFIG: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
