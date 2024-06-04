import { Component, OnInit } from '@angular/core';
import { BootcampListItem } from '../../features/models/responses/bootcamp/bootcamp-item-dto';
import { BootcampService } from '../../features/services/concretes/bootcamp.service';
import { PageRequest } from '../../core/models/requests/page-request';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UpdateBootcampRequest } from '../../features/models/requests/bootcamp/update-bootcamp-request';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { GetListBootcampResponse } from '../../features/models/responses/bootcamp/get-list-bootcamp-response';
import { CreateBootcampRequest } from '../../features/models/requests/bootcamp/create-bootcamp-request';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent implements OnInit {
  bootcamps: BootcampListItem = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: [],
    editing: false,
  };

  updateBootcampForm!: FormGroup;
  addBootcampFrom!: FormGroup;
  item!: GetListBootcampResponse;
  router: any;

  constructor(
    private bootcampService: BootcampService,
    private toastService: ToastrService,
    private formBuilder: FormBuilder
  ) {}
  readonly PAGE_SIZE = 3;
  ngOnInit(): void {
    this.getBootcamps({ page: 0, pageSize: this.PAGE_SIZE });
    this.updateBootcampForm = this.formBuilder.group({
      id: [''],
      name: [''],
      instructorFirstName: [''],
      instructorLastName: [''],
      instructorId: [''],
      startDate: [''],
      endDate: [''],
      bootcampStateId: [''],
      imagePath: [''],
    });
  }

  editingItem: boolean = false;

  toggleEdit(item: GetListBootcampResponse): void {
    item.editing = !item.editing;
  }
  cancelEdit(): void {
    this.editingItem = false; // Set editingItem to false to close the edit form
  }

  getBootcamps(pageRequest: PageRequest) {
    this.bootcampService.getList(pageRequest).subscribe((response) => {
      this.bootcamps = response;
    });
  }

  // updateBootcamp(){
  //   if(this.updateBootcampForm){
  //     let updateBootcamp:UpdateBootcampRequest=Object.assign({}, this.updateBootcampForm.value);
  //     this.bootcampService.updateBootcamp(updateBootcamp).subscribe({
  //       next:(response)=>{
  //         this.toastService.success("Başarılı")
  //       },
  //       error:(response)=>{
  //         console.log(response)
  //         this.toastService.error("Kayıt işlemi başarısız")
  //       }
  //     }
  //    );
  //   }else{
  //     this.toastService.error("Lütfen gerekli alanları doldurunuz")
  //   }
  // }
  updateBootcamp(item: GetListBootcampResponse): void {
    console.log('Updating bootcamp:', this.updateBootcampForm.value);
    const updatedBootcamp = this.updateBootcampForm.value;
    this.bootcampService.updateBootcamp(updatedBootcamp).subscribe({
      next: (response) => {
        console.log('Update successful:', response);
        this.toastService.success('Update successful');
        // Reset form and set editing to false
        this.updateBootcampForm.reset();
        item.editing = false;
      },
      error: (err) => {
        console.error('Update failed:', err);
        console.log('Update failed - Request payload:', updatedBootcamp); // Log the payload
        this.toastService.error('Update failed');
      },
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
