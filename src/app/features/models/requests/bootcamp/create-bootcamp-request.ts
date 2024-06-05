export interface CreateBootcampRequest {
  name: string;
  instructorId: string;
  bootcampStateId: number;
  startDate: Date;
  endDate: Date;
  imagePath: string;
  description: string;
}
