import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BootcampListItem } from '../../../features/models/responses/bootcamp/bootcamp-item-dto';
import { GetListBootcampResponse } from '../../../features/models/responses/bootcamp/get-list-bootcamp-response';
import { BootcampService } from '../../../features/services/concretes/bootcamp.service';
import { ToastrService } from 'ngx-toastr';
import { PageRequest } from '../../../core/models/requests/page-request';
import { CreateBootcampRequest } from '../../../features/models/requests/bootcamp/create-bootcamp-request';
import { MatDialog } from '@angular/material/dialog';
import { BootcampCrudPopUpComponent } from './bootcamp-create-modal/bootcamp-crud-pop-up.component';
import { CustomDatePipe } from '../../../core/helpers/custom-date/customDatePipe';
import { PaginationService } from '../../../features/services/concretes/pagination.service';

@Component({
  selector: 'app-bootcamp',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomDatePipe,
  ],
  templateUrl: './bootcamp.component.html',
  styleUrls: ['./bootcamp.component.scss'],
})
export class BootcampComponent implements OnInit {
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
  currentPageNumber: number = 1;

  constructor(
    private bootcampService: BootcampService,
    private toastService: ToastrService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.getBootcamps({ page: 0, pageSize: this.paginationService.PAGE_SIZE });

    this.updateBootcampForm = this.formBuilder.group({
      id: { disabled: true },
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

  toggleEdit(item: GetListBootcampResponse): void {
    item.editing = !item.editing;
    if (item.editing) {
      this.updateBootcampForm.patchValue({
        id: item.id,
        name: item.name,
        instructorFirstName: item.instructorFirstName,
        instructorLastName: item.instructorLastName,
        instructorId: item.instructorId,
        startDate: item.startDate,
        endDate: item.endDate,
        bootcampStateId: item.bootcampStateId,
        imagePath: item.imagePath,
      });
    }
  }

  getBootcamps(pageRequest: PageRequest): void {
    this.paginationService.paginate(
      (request) => this.bootcampService.getList(request),
      pageRequest,
      (response) => {
        console.log('Bootcamps loaded:', response);
        this.bootcamps = response; // Ensure this is updated correctly
      },
      (error) => console.error('Bootcamps failed to load: ', error)
    );
  }

  updateBootcamp(item: GetListBootcampResponse): void {
    console.log('Updating bootcamp:', this.updateBootcampForm.value);
    const updatedBootcamp = this.updateBootcampForm.value;
    this.bootcampService.updateBootcamp(updatedBootcamp).subscribe({
      next: (response) => {
        console.log('Update successful:', response);
        this.toastService.success('Update successful');
        const index = this.bootcamps.items.findIndex((x) => x.id === item.id);
        if (index !== -1) {
          this.bootcamps.items[index] = updatedBootcamp;
        }
        this.updateBootcampForm.reset();
        item.editing = false;
      },
      error: (err) => {
        console.error('Update failed:', err);
        console.log('Update failed - Request payload:', updatedBootcamp);
        this.toastService.error('Update failed');
      },
    });
  }

  openAddBootcampModal(): void {
    const dialogRef = this.dialog.open(BootcampCrudPopUpComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this bootcamp?')) {
      this.bootcampService.deleteBootcamp(id).subscribe({
        next: (response) => {
          this.toastService.success('Bootcamp deleted successfully');
          // Refresh bootcamps after deletion
          this.getBootcamps({
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

  nextOnClick(): void {
    this.paginationService.next(
      (request) => this.bootcampService.getList(request),
      this.bootcamps.index,
      this.bootcamps.hasNext,
      (response) => {
        this.bootcamps = response;
        this.updateCurrentPageNumber();
      },
      (error) => console.error('Failed to fetch bootcamps:', error)
    );
  }

  previousOnClick(): void {
    this.paginationService.previous(
      (request) => this.bootcampService.getList(request),
      this.bootcamps.index,
      this.bootcamps.hasPrevious,
      (response) => {
        this.bootcamps = response;
        this.updateCurrentPageNumber();
      },
      (error) => console.error('Failed to fetch bootcamps:', error)
    );
  }

  goToPage(page: number): void {
    this.paginationService.goToPage(
      (request) => this.bootcampService.getList(request),
      page,
      (response) => {
        this.bootcamps = response;
        this.updateCurrentPageNumber();
      },
      (error) => console.error('Failed to fetch bootcamps:', error)
    );
  }

  totalPages(): number[] {
    return this.paginationService.totalPages(this.bootcamps.count);
  }

  updateCurrentPageNumber(): void {
    this.currentPageNumber = this.bootcamps.index + 1;
  }
}
