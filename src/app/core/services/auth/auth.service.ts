import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(private httpClient: HttpClient) {}

  private router = inject(Router);
  private pLATFORM_ID = inject(PLATFORM_ID);

  sendRegisterForm(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/auth/signup`,
      data
    );
  }

  sendLoginForm(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/auth/signin`,
      data
    );
  }

  getUserData(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.userData = jwtDecode(localStorage.getItem('token')!);
    }

    console.log(this.userData);
  }

  logoutUser(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      localStorage.removeItem('token');
    }

    this.userData = null;
    this.router.navigate(['/login']);
  }

  setEmailVerify(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/auth/forgotPasswords`,
      data
    );
  }

  setCodeVerify(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/auth/verifyResetCode`,
      data
    );
  }

  setResetPassowrd(data: object): Observable<any> {
    return this.httpClient.put(
      `${environment.baseUrl}/api/v1/auth/resetPassword`,
      data
    );
  }
}
