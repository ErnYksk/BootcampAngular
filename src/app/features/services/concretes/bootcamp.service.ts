import { Injectable } from '@angular/core';
import { BootcampBaseService } from '../abstracts/bootcamp-base.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { PageRequest } from '../../../core/models/requests/page-request';
import { BootcampListItem } from '../../models/responses/bootcamp/bootcamp-item-dto';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environments.development';
import { CreateBootcampRequest } from '../../models/requests/bootcamp/create-bootcamp-request';
import { UpdateBootcampRequest } from '../../models/requests/bootcamp/update-bootcamp-request';
import { CreateBootcampResponse } from '../../models/responses/bootcamp/create-bootcamp-response';
import { DeleteBootcampResponse } from '../../models/responses/bootcamp/delete-bootcamp-response';
import { GetByIdBootcampResponse } from '../../models/responses/bootcamp/get-by-id-bootcamp-response';
import { UpdateBootcampesponse } from '../../models/responses/bootcamp/update-bootcamp-response';

@Injectable({
  providedIn: 'root',
})
export class BootcampService extends BootcampBaseService {
  constructor(private httpClient: HttpClient) {
    super();
  }

  private readonly apiUrl: string = `${environment.API_BOOTCAMP}`;

  override getBootcamp(id: number): Observable<GetByIdBootcampResponse> {
    return this.httpClient
      .get<GetByIdBootcampResponse>(`${this.apiUrl}/ + id`)
      .pipe(
        map((response) => {
          const newResponse: GetByIdBootcampResponse = {
            id: response.id,
            name: response.name,
            bootcampStateName: response.bootcampStateName,
            startDate: response.startDate,
            endDate: response.endDate,
            instructorFirstName: response.instructorFirstName,
            instructorLastName: response.instructorLastName,
            instructorId: response.instructorId,
            bootcampStateId: response.bootcampStateId,
            imagePath: response.imagePath,
          };
          return newResponse;
        })
      );
  }

  override updateBootcamp(
    bootcamp: UpdateBootcampRequest
  ): Observable<UpdateBootcampesponse> {
    return this.httpClient.put<UpdateBootcampesponse>(this.apiUrl, bootcamp);
  }

  override postBootcamp(
    bootcamp: CreateBootcampRequest
  ): Observable<CreateBootcampResponse> {
    return this.httpClient.post<CreateBootcampResponse>(this.apiUrl, bootcamp);
  }
  override deleteBootcamp(id: number): Observable<DeleteBootcampResponse> {
    return this.httpClient.delete<DeleteBootcampResponse>(
      `${this.apiUrl}/+ id`
    );
  }

  override getList(pageRequest: PageRequest): Observable<BootcampListItem> {
    const newRequest: { [key: string]: string | number } = {
      page: pageRequest.page,
      pageSize: pageRequest.pageSize,
    };

    return this.httpClient
      .get<BootcampListItem>(this.apiUrl, {
        params: newRequest,
      })
      .pipe(
        map((response) => {
          const newResponse: BootcampListItem = {
            index: pageRequest.page,
            size: pageRequest.pageSize,
            count: response.count,
            hasNext: response.hasNext,
            hasPrevious: response.hasPrevious,
            items: response.items,
            pages: response.pages,
            editing: response.editing,
          };
          return newResponse;
        })
      );
  }
}
