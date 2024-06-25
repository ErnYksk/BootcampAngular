import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from '../../../features/services/concretes/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserLoginRequest } from '../../../features/models/requests/auth/user-login-request';
import { RegisterComponent } from '../../register/register.component';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from '../../homepage/homepage.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RegisterComponent,
    CommonModule,
    RouterModule,
    HomepageComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel: UserLoginRequest = Object.assign(
        {},
        this.loginForm.value
      );

      this.authService.login(loginModel).subscribe(
        (response) => {
          this.toastrService.success('Success');
          this.router.navigate(['homepage']);
        },
        (error) => {
          if (error.error.status === 500) {
            this.toastrService.error('Invalid Email or Password', 'Error!');
          } else {
            this.toastrService.error(
              'Please Enter a Valid Email and Password',
              'Error!'
            );
          }
        }
      );
    } else {
      this.toastrService.error('Please Enter Valid Email and Password', 'Hata');
    }
  }
}
