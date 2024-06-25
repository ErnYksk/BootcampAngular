import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login/login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminComponent } from './pages/admin/admin.component';
import { BootcampListComponent } from './features/components/bootcamp-list/bootcamp-list.component';
import { BootcampComponent } from './pages/admin/bootcamp/bootcamp.component';
import { BootcampDetailComponent } from './features/components/bootcamp-detail/bootcamp-detail.component';
import { InstructorComponent } from './features/components/instructor/instructor.component';
import { InstructorDetailComponent } from './features/components/instructor-detail/instructor-detail.component';
import { AboutComponent } from './shared/components/navbar/about/about.component';
import { ContactComponent } from './shared/components/navbar/contact/contact.component';

export const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'admin',
    component: AdminComponent,
    // children: [{ path: 'bootcamps', component: BootcampComponent }],
  },

  { path: 'bootcamps', component: BootcampListComponent },
  { path: 'bootcamp-detail/:bootcampId', component: BootcampDetailComponent },

  { path: 'instructors', component: InstructorComponent },
  {
    path: 'instructor-detail/:instructorId',
    component: InstructorDetailComponent,
  },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
];
