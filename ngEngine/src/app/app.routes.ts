import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

export const ROUTER_CONFIG: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: MainComponent
  }
];
