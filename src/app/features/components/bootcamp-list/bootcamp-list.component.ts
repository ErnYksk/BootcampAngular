import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GetListBootcampResponseDto } from '../../models/responses/bootcamp/get-list-bootcamp-response-dto';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DataResult } from '../../models/data-result';

@Component({
  selector: 'app-bootcamp-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './bootcamp-list.component.html',
  styleUrl: './bootcamp-list.component.scss',
})
export class BootcampListComponent implements OnInit {
  bootcampList: GetListBootcampResponseDto[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getBootcampListModels();
  }

  getBootcampListModels() {
    this.httpClient
      .get<DataResult<GetListBootcampResponseDto[]>>(
        'http://localhost:5278/api/Bootcamps?PageIndex=0&PageSize=10'
      )
      .subscribe({
        next: (response: DataResult<GetListBootcampResponseDto[]>) => {
          console.log('Cevap geldi :', response);
          this.bootcampList = response.items;
        },
        error: (error) => {
          console.log('cevap hatalı :', error);
        },
        complete: () => {
          console.log('istek sonlandı');
        },
      });
  }
}
