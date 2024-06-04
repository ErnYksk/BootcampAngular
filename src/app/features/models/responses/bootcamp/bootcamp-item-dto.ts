import { PageResponse } from '../../../../core/models/responses/page-response';
import { GetListBootcampResponse } from './get-list-bootcamp-response';

export interface BootcampListItem extends PageResponse {
  items: GetListBootcampResponse[];
  editing: boolean;
}
