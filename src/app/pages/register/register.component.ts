import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../features/services/concretes/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginComponent } from '../login/login/login.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      username: [''],
      firstname: [''],
      lastname: [''],
      dateOfBirth: [''],
      nationalIdentity: [''],
      about: [''],
    });
  }
  // register() {
  //   if (this.registerForm.valid) {
  //     console.log(this.registerForm.value);
  //     let registerModel = Object.assign({}, this.registerForm.value);
  //     this.authService.registerApplicant(registerModel).subscribe(
  //       (response) => {
  //         this.toastrService.success('Success');
  //         this.router.navigate(['homepage']);
  //       },
  //       (errorResponse) => {
  //         console.log(errorResponse);
  //       }
  //     );
  //   }
  // }

  register() {
    if (this.registerForm.valid) {
      const registerModel: any = {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        username: this.registerForm.value.username || '',
        firstname: this.registerForm.value.firstname || '',
        lastname: this.registerForm.value.lastname || '',
        dateOfBirth: this.registerForm.value.dateOfBirth || '',
        nationalIdentity: this.registerForm.value.nationalIdentity || '',
        about: this.registerForm.value.about || '',
      };

      this.authService.registerApplicant(registerModel).subscribe(
        (response) => {
          this.toastrService.success('Success');
          this.router.navigate(['homepage']);
        },
        (errorResponse) => {
          console.log(errorResponse);
        }
      );
    }
  }
}
