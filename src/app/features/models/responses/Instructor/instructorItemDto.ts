import { PageResponse } from '../../../../core/models/responses/page-response';
import { GetlistInstructorResponse } from './get-list-instructor-response-dto';

export interface InstructorListItem extends PageResponse {
  items: GetlistInstructorResponse[];
}
