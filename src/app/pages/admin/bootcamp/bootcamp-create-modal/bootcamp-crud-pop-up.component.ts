import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BootcampService } from '../../../../features/services/concretes/bootcamp.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CreateBootcampRequest } from '../../../../features/models/requests/bootcamp/create-bootcamp-request';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-bootcamp-crud-pop-up',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './bootcamp-crud-pop-up.component.html',
  styleUrl: './bootcamp-crud-pop-up.component.scss',
})
export class BootcampCrudPopUpComponent implements OnInit {
  addBootcampFrom!: FormGroup;

  constructor(
    private bootcampService: BootcampService,
    private toastService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<BootcampCrudPopUpComponent>
  ) {}

  ngOnInit() {
    this.addBootcampFrom = this.formBuilder.group({
      name: ['', Validators.required],
      instructorId: ['', Validators.required],
      bootcampStateId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      imagePath: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  addBootcamp() {
    let createBootcamp: CreateBootcampRequest = Object.assign(
      {},
      this.addBootcampFrom.value
    );
    this.bootcampService.postBootcamp(createBootcamp).subscribe({
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
