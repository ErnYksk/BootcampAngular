import { Injectable } from '@angular/core';
import { PageRequest } from '../../../core/models/requests/page-request';
import { Observable } from 'rxjs';
import { CreateInstructorRequest } from '../../models/requests/instructor/create-instructor-request';
import { UpdateInstructorRequest } from '../../models/requests/instructor/update-instructor-request';
import { InstructorListItem } from '../../models/responses/Instructor/instructorItemDto';
import { CreateInstructorResponse } from '../../models/responses/Instructor/create-instructor-response';
import { GetlistInstructorResponse } from '../../models/responses/Instructor/get-list-instructor-response-dto';
import { DeleteInstructorResponse } from '../../models/responses/Instructor/delete-instructor-response';
import { UpdateInstructorResponse } from '../../models/responses/Instructor/update-instructor-response';

@Injectable({
  providedIn: 'root',
})
export abstract class InstructorBaseService {
  constructor() {}
  abstract getList(pageRequest: PageRequest): Observable<InstructorListItem>;
  abstract postInstructor(
    instructor: CreateInstructorRequest
  ): Observable<CreateInstructorResponse>;
  abstract deleteInstructor(id: string): Observable<DeleteInstructorResponse>;
  abstract updateInstructor(
    instructor: UpdateInstructorRequest
  ): Observable<UpdateInstructorResponse>;
  abstract getInstructor(id: string): Observable<GetlistInstructorResponse>;
}
