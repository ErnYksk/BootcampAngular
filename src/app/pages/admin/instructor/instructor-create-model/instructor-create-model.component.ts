import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InstructorService } from '../../../../features/services/concretes/instructor.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateInstructorRequest } from '../../../../features/models/requests/instructor/create-instructor-request';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-instructor-create-model',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './instructor-create-model.component.html',
  styleUrl: './instructor-create-model.component.scss',
})
export class InstructorCreateModelComponent implements OnInit {
  addInstructorFrom!: FormGroup;

  constructor(
    private instructorService: InstructorService,
    private toastService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<InstructorCreateModelComponent>
  ) {}

  ngOnInit() {
    this.addInstructorFrom = this.formBuilder.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      nationalIdentity: ['', Validators.required],
      companyName: ['', Validators.required],
    });
  }

  addInstructor() {
    let createInstructor: CreateInstructorRequest = Object.assign(
      {},
      this.addInstructorFrom.value
    );
    this.instructorService.postInstructor(createInstructor).subscribe({
      next: (response) => {
        this.toastService.success('Created successfully');
        this.dialogRef.close();
      },
      error: (response) => {
        this.toastService.error('Creating is failed');
      },
    });
  }

  closeModal() {
    this.dialogRef.close();
  }
}
