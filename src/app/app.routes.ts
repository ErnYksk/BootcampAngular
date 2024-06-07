import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login/login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminComponent } from './pages/admin/admin.component';
import { BootcampListComponent } from './features/components/bootcamp-list/bootcamp-list.component';
import { BootcampComponent } from './pages/admin/bootcamp/bootcamp.component';

export const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'admin',
    component: AdminComponent,
    children: [{ path: 'bootcamps', component: BootcampComponent }],
  },

  { path: 'bootcamps', component: BootcampListComponent },
];
