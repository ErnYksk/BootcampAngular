import { Component, OnInit } from '@angular/core';
import { InstructorService } from '../../../features/services/concretes/instructor.service';
import { AuthService } from '../../../features/services/concretes/auth.service';
import { InstructorListItem } from '../../../features/models/responses/Instructor/instructorItemDto';
import { PageRequest } from '../../../core/models/requests/page-request';
import { PaginationService } from '../../../features/services/concretes/pagination.service';
import { connect } from 'rxjs';
import { CustomDatePipe } from '../../../core/helpers/custom-date/customDatePipe';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { GetlistInstructorResponse } from '../../../features/models/responses/Instructor/get-list-instructor-response-dto';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { InstructorCreateModelComponent } from './instructor-create-model/instructor-create-model.component';

@Component({
  selector: 'app-instructor',
  standalone: true,
  templateUrl: './instructor.component.html',
  styleUrl: './instructor.component.scss',
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomDatePipe,
  ],
})
export class InstructorComponent implements OnInit {
  currentPageNumber: number = 1;

  updateInstructorForm!: FormGroup;

  constructor(
    private instructorService: InstructorService,
    private authService: AuthService,
    private paginationService: PaginationService,
    private toastService: ToastrService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  instructorList: InstructorListItem = {
    index: 0,

    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: [],
  };

  filteredInstructorList: InstructorListItem = this.instructorList;

  ngOnInit(): void {
    this.getList({ page: 0, pageSize: this.paginationService.PAGE_SIZE });

    this.updateInstructorForm = this.formBuilder.group({
      id: { disabled: true },
      userName: [''],
      firstName: [''],
      lastName: [''],
      companyName: [''],
      dateOfBirth: [''],
      nationalIdentity: [''],
      email: [''],
      password: [''],
      updatedDate: [''],
    });
  }

  getList(pageRequest: PageRequest) {
    this.paginationService.paginate(
      (request) => this.instructorService.getList(request),
      pageRequest,
      (response) => {
        console.log('Instructors loaded: ', response);
        this.instructorList = response;
      },
      (error) => console.log('Instructors failed to load: ', error)
    );
  }

  updateInstructor(item: GetlistInstructorResponse): void {
    console.log('Updating instructor:', this.updateInstructorForm.value);
    const updatedBootcamp = this.updateInstructorForm.value;
    this.instructorService.updateInstructor(updatedBootcamp).subscribe({
      next: (response) => {
        console.log('Update successful:', response);
        this.toastService.success('Update successful');
        const index = this.instructorList.items.findIndex(
          (x) => x.id === item.id
        );
        if (index !== -1) {
          this.instructorList.items[index] = updatedBootcamp;
        }
        this.updateInstructorForm.reset();
        item.editing = false;
      },
      error: (err) => {
        console.error('Update failed:', err);
        console.log('Update failed - Request payload:', updatedBootcamp);
        this.toastService.error('Update failed');
      },
    });
  }

  delete(id: string): void {
    if (confirm('Are you sure you want to delete this instructor?')) {
      this.instructorService.deleteInstructor(id).subscribe({
        next: (response) => {
          this.toastService.success('Instructor deleted successfully');
          this.getList({
            page: 0,
            pageSize: this.paginationService.PAGE_SIZE,
          });
        },
        error: (err) => {
          console.error('Deletion failed:', err);
          this.toastService.error('Deletion failed');
        },
      });
    }
  }

  openAddInstructorModal(): void {
    const dialogRef = this.dialog.open(InstructorCreateModelComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  nextOnClick(): void {
    this.paginationService.next(
      (request) => this.instructorService.getList(request),
      this.instructorList.index,
      this.instructorList.hasNext,
      (response) => {
        this.instructorList = response;
        this.updateCurrentPageNumber();
      },
      (error) => console.error('Failed to fetch bootcamps:', error)
    );
  }

  previousOnClick(): void {
    this.paginationService.previous(
      (request) => this.instructorService.getList(request),
      this.instructorList.index,
      this.instructorList.hasPrevious,
      (response) => {
        this.instructorList = response;
        this.updateCurrentPageNumber();
      },
      (error) => console.error('Failed to fetch bootcamps:', error)
    );
  }

  goToPage(page: number): void {
    this.paginationService.goToPage(
      (request) => this.instructorService.getList(request),
      page,
      (response) => {
        this.instructorList = response;
        this.updateCurrentPageNumber();
      },
      (error) => console.error('Failed to fetch bootcamps:', error)
    );
  }

  totalPages(): number[] {
    return this.paginationService.totalPages(this.instructorList.count);
  }

  updateCurrentPageNumber(): void {
    this.currentPageNumber = this.instructorList.index + 1;
  }

  toggleEdit(item: GetlistInstructorResponse): void {
    item.editing = !item.editing;
    if (item.editing) {
      this.updateInstructorForm.patchValue({
        id: item.id,
        userName: item.userName,
        firstName: item.firstName,
        lastName: item.lastName,
        companyName: item.companyName,
        dateOfBirth: item.dateOfBirth,
        nationalIdentity: item.nationalIdentity,
        email: item.email,
        password: item.password,
        updatedDate: item.updatedDate,
        editing: item.editing,
      });
    }
  }
}
