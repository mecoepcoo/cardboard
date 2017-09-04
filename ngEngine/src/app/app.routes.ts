import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { DesktopToolbarComponent } from './desktop-toolbar/desktop-toolbar.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';

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
    component: MainComponent,
    children: [
      {
        path: 'category',
        component: CategoryDetailComponent
      },
      {
        path: 'category/:id',
        component: CategoryDetailComponent
      }
    ]
  }
];
