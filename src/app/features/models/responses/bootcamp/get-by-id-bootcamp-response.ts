export interface GetByIdBootcampResponse {
  id: number;
  name: string;
  instructorId: string;
  bootcampStateId: number;
  startDate: Date;
  endDate: Date;
  instructorFirstName: string;
  instructorLastName: string;
  imagePath: string;
  bootcampStateName: string;
}
