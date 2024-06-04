import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { BootcampListComponent } from './features/components/bootcamp-list/bootcamp-list.component';
import { SearchFieldComponent } from './shared/components/search-field/search-field.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login/login.component';
import { AuthService } from './features/services/concretes/auth.service';
import { AdminComponent } from './pages/admin/admin.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    BootcampListComponent,
    SearchFieldComponent,
    HttpClientModule,
    CommonModule,
    LoginComponent,
    AdminComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'BootcampAngular';
  isLoggedIn: boolean;
  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.loggedIn();
  }
  isHomePage() {
    return window.location.pathname === '/homepage';
  }
}
