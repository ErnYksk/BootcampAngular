import { Component } from '@angular/core';
import { InstructorListItem } from '../../models/responses/Instructor/instructorItemDto';
import { PaginationService } from '../../services/concretes/pagination.service';
import { PageRequest } from '../../../core/models/requests/page-request';
import { InstructorService } from '../../services/concretes/instructor.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-instructor',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './instructor.component.html',
  styleUrl: './instructor.component.scss',
})
export class InstructorComponent {
  constructor(
    private paginationService: PaginationService,
    private instructorService: InstructorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getList({ page: 0, pageSize: this.paginationService.PAGE_SIZE });
  }

  getList(pageRequest: PageRequest) {
    this.paginationService.paginate(
      (request) => this.instructorService.getList(request),
      pageRequest,
      (response) => {
        console.log('Instructors loaded: ' + response);
        this.instructorList = response;
      },
      (error) => console.log('Instructors failed to load: ' + error)
    );
  }
  currentPageNumber: number = 1;
  instructorList: InstructorListItem = {
    index: 0,

    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: [],
  };

  viewDetails(instructorId: string): void {
    this.router.navigate(['instructor-detail', instructorId]);
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
}
