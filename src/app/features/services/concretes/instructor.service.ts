import { Injectable } from '@angular/core';
import { InstructorBaseService } from '../abstracts/instructor-base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environments.development';
import { PageRequest } from '../../../core/models/requests/page-request';
import { InstructorListItem } from '../../models/responses/Instructor/instructorItemDto';
import { Observable, map } from 'rxjs';
import { GetlistInstructorResponse } from '../../models/responses/Instructor/get-list-instructor-response-dto';
import { CreateInstructorRequest } from '../../models/requests/instructor/create-instructor-request';
import { DeleteInstructorResponse } from '../../models/responses/Instructor/delete-instructor-response';
import { UpdateInstructorRequest } from '../../models/requests/instructor/update-instructor-request';
import { UpdateInstructorResponse } from '../../models/responses/Instructor/update-instructor-response';
import { CreateInstructorResponse } from '../../models/responses/Instructor/create-instructor-response';

@Injectable({
  providedIn: 'root',
})
export class InstructorService extends InstructorBaseService {
  constructor(private httpClient: HttpClient) {
    super();
  }
  readonly apiUrlRegister: string = `${environment.API_URL}/Auth/RegisterInstructor`;
  private readonly apiUrl: string = `${environment.API_URL}/instructors`;

  override getList(pageRequest: PageRequest): Observable<InstructorListItem> {
    const newRequest: { [key: string]: string | number } = {
      page: pageRequest.page,
      pageSize: pageRequest.pageSize,
    };

    return this.httpClient
      .get<InstructorListItem>(this.apiUrl, {
        params: newRequest,
      })
      .pipe(
        map((response) => {
          const newResponse: InstructorListItem = {
            index: pageRequest.page,
            size: pageRequest.pageSize,
            count: response.count,
            hasNext: response.hasNext,
            hasPrevious: response.hasPrevious,
            items: response.items,
            pages: response.pages,
          };
          return newResponse;
        })
      );
  }
  override getInstructor(id: string): Observable<GetlistInstructorResponse> {
    return this.httpClient
      .get<GetlistInstructorResponse>(`${this.apiUrl}/` + id)
      .pipe(
        map((response) => {
          const newResponse: GetlistInstructorResponse = {
            id: response.id,
            userName: response.userName,
            firstName: response.firstName,
            lastName: response.lastName,
            companyName: response.companyName,
            dateOfBirth: response.dateOfBirth,
            nationalIdentity: response.nationalIdentity,
            email: response.email,
            password: response.password,
            updatedDate: response.updatedDate,
            editing: response.editing,
          };
          return newResponse;
        })
      );
  }
  override postInstructor(
    instructor: CreateInstructorRequest
  ): Observable<CreateInstructorResponse> {
    return this.httpClient.post<CreateInstructorResponse>(
      this.apiUrlRegister,
      instructor
    );
  }
  override deleteInstructor(id: string): Observable<DeleteInstructorResponse> {
    return this.httpClient.delete<DeleteInstructorResponse>(
      `${this.apiUrl}/` + id
    );
  }
  override updateInstructor(
    instructor: UpdateInstructorRequest
  ): Observable<UpdateInstructorResponse> {
    return this.httpClient.put<UpdateInstructorResponse>(
      `${this.apiUrl}`,
      instructor
    );
  }
}
