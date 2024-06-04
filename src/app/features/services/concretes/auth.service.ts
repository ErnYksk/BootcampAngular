import { Injectable } from '@angular/core';
import { AuthBaseService } from '../abstracts/auth-base.service';
import { Observable, catchError, map, switchMap, tap, throwError } from 'rxjs';
import { ApplicantRegisterRequest } from '../../models/requests/auth/applicant-register-request';
import { TokenModel } from '../../models/responses/Auth/token-model';
import { environment } from '../../../../environments/environments.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from './local-storage-service.service';
import { AccessTokenModel } from '../../models/responses/Auth/access-token-model';
import { UserLoginRequest } from '../../models/requests/auth/user-login-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends AuthBaseService {
  fullname!: string;
  userId!: string;
  token: any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  claims: string[] = [];

  private readonly apiUrl: string = `${environment.API_AUTH}`;

  constructor(
    private httpClient: HttpClient,
    private storageService: LocalStorageService,
    private toastrService: ToastrService
  ) {
    super();
  }

  // override registerApplicant(
  //   userforRegisterRequest: ApplicantRegisterRequest
  // ): Observable<TokenModel> {
  //   return this.httpClient
  //     .post<TokenModel>(
  //       `${this.apiUrl}/RegisterApplicant`,
  //       userforRegisterRequest
  //     )
  //     .pipe(
  //       switchMap((response: TokenModel) => {
  //         this.storageService.setToken(response.token);

  //         return this.sendVerifyEmail().pipe(
  //           tap(() => {
  //             this.toastrService.success('Doğrulama maili gönderildi');
  //             localStorage.removeItem('token');
  //           }),
  //           catchError((error) => {
  //             this.toastrService.error(
  //               'Mail gönderilemedi. Lütfen tekrar deneyin.'
  //             );
  //             return throwError(error);
  //           })
  //         );
  //       })
  //     );
  // }

  sendVerifyEmail(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      accept: 'application/json',
    });

    return this.httpClient.get(`${this.apiUrl}/EnableEmailAuthenticator`, {
      headers,
    });
  }

  override registerApplicant(
    userforRegisterRequest: ApplicantRegisterRequest
  ): Observable<TokenModel> {
    userforRegisterRequest.firstName = userforRegisterRequest.firstName || '';
    userforRegisterRequest.lastName = userforRegisterRequest.lastName || '';
    userforRegisterRequest.userName = userforRegisterRequest.userName || '';
    userforRegisterRequest.about = userforRegisterRequest.about || '';
    userforRegisterRequest.nationalIdentity =
      userforRegisterRequest.nationalIdentity || '';
    userforRegisterRequest.dateOfBirth =
      userforRegisterRequest.dateOfBirth || new Date();

    return this.httpClient.post<TokenModel>(
      `${this.apiUrl}/RegisterApplicant`,
      userforRegisterRequest
    );
    // .pipe(
    //   switchMap((response: TokenModel) => {
    //     this.storageService.setToken(response.token);

    //     return this.sendVerifyEmail().pipe(
    //       tap(() => {
    //         this.toastrService.success('Doğrulama maili gönderildi');
    //         localStorage.removeItem('token');
    //       }),
    //       catchError((error) => {
    //         this.toastrService.error(
    //           'Mail gönderilemedi. Lütfen tekrar deneyin.'
    //         );
    //         return throwError(error);
    //       })
    //     );
    //   })
    // );
  }

  login(
    userLoginRequest: UserLoginRequest
  ): Observable<AccessTokenModel<TokenModel>> {
    return this.httpClient
      .post<AccessTokenModel<TokenModel>>(
        `${this.apiUrl}/login`,
        userLoginRequest
      )
      .pipe(
        map((response) => {
          this.storageService.setToken(response.accessToken.token);
          // this.toastrService.success('başarılı');
          //alert("Giriş yapıldı");
          // setTimeout(()=>{
          //   window.location.reload()
          // },1000)

          return response;
        }),
        catchError((responseError) => {
          //alert(responseError.error)
          throw responseError;
        })
      );
  }

  getDecodedToken() {
    try {
      this.token = this.storageService.getToken();
      return this.jwtHelper.decodeToken(this.token);
    } catch (error) {
      return error;
    }
  }

  loggedIn(): boolean {
    this.token = this.storageService.getToken();
    let isExpired = this.jwtHelper.isTokenExpired(this.token);
    return !isExpired;
  }

  getUserName(): string {
    var decoded = this.getDecodedToken();
    var propUserName = Object.keys(decoded).filter((x) =>
      x.endsWith('/name')
    )[0];
    return (this.fullname = decoded[propUserName]);
  }

  getCurrentUserId(): string {
    var decoded = this.getDecodedToken();
    var propUserId = Object.keys(decoded).filter((x) =>
      x.endsWith('/nameidentifier')
    )[0];
    return (this.userId = decoded[propUserId]);
  }

  logOut() {
    this.storageService.removeToken();
    this.toastrService.success('Succesfull Logout');
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  }

  getRoles(): string[] {
    if (this.storageService.getToken()) {
      var decoded = this.getDecodedToken();
      var role = Object.keys(decoded).filter((x) => x.endsWith('/role'))[0];
      this.claims = decoded[role];
    }
    return this.claims;
  }

  isAdmin() {
    if (this.claims.includes('admin' && 'Admin')) {
      return true;
    } else {
      return false;
    }
  }
}
