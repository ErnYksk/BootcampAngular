export interface ApplicantRegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  about: string;
  userName: string;
  nationalIdentity: string;
}
