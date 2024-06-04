import { Component, OnInit } from '@angular/core';
import { CreateBootcampRequest } from '../../features/models/requests/bootcamp/create-bootcamp-request';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BootcampService } from '../../features/services/concretes/bootcamp.service';
import { ToastrService } from 'ngx-toastr';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test2',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './test2.component.html',
  styleUrl: './test2.component.scss',
})
export class Test2Component implements OnInit {
  addBootcampFrom!: FormGroup;

  constructor(
    private bootcampService: BootcampService,
    private toastService: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.addBootcampFrom = this.formBuilder.group({
      name: ['', Validators.required],
      instructorId: ['', Validators.required],
      bootcampStateId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      imagePath: ['', Validators.required],
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
      },
      error: (response) => {
        this.toastService.error('Creating is failed');
      },
    });
  }
}
