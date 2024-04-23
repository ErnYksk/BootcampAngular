export interface GetListBootcampResponseDto {
  id: number;
  name: string;
  instructorId: string;
  bootcampStateId: number;
  startDate: Date;
  endDate: Date;
  instructorFirstName: string;
  instructorLastName: string;
}
