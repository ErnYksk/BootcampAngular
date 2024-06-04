import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login/login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminComponent } from './pages/admin/admin.component';
import { TestComponent } from './pages/test/test.component';
import { BootcampListComponent } from './features/components/bootcamp-list/bootcamp-list.component';
import { Test2Component } from './pages/test2/test2.component';

export const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'test', component: TestComponent },
  { path: 'test2', component: Test2Component },
  { path: 'bootcamps', component: BootcampListComponent },
];
