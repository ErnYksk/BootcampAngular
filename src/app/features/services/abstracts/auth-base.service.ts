import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenModel } from '../../models/responses/Auth/token-model';
import { ApplicantRegisterRequest } from '../../models/requests/auth/applicant-register-request';

@Injectable({
  providedIn: 'root',
})
export abstract class AuthBaseService {
  abstract registerApplicant(
    applicantforRegisterRequest: ApplicantRegisterRequest
  ): Observable<TokenModel>;
}
