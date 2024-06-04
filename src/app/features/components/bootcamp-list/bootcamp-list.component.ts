import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BootcampService } from '../../services/concretes/bootcamp.service';
import { PageRequest } from '../../../core/models/requests/page-request';
import { BootcampListItem } from '../../models/responses/bootcamp/bootcamp-item-dto';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-bootcamp-list',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './bootcamp-list.component.html',
  styleUrl: './bootcamp-list.component.scss',
})
export class BootcampListComponent implements OnInit {
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
  constructor(private bootcampService: BootcampService) {}
  readonly PAGE_SIZE = 3;
  ngOnInit(): void {
    this.getBootcamps({ page: 0, pageSize: this.PAGE_SIZE });
  }

  getBootcamps(pageRequest: PageRequest) {
    this.bootcampService.getList(pageRequest).subscribe((response) => {
      this.bootcamps = response;
    });
  }
}
