import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRequestBody } from './auth-request-body.model';
import { AuthResponseData } from './auth-response-data.model';
import { apiKey } from 'secret';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
    const authRequestBody = { email, password, returnSecureToken: true } as AuthRequestBody;
    return this.http.post<AuthResponseData>(url, authRequestBody).pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
    const authRequestBody = { email, password, returnSecureToken: true } as AuthRequestBody;
    return this.http.post<AuthResponseData>(url, authRequestBody).pipe(catchError(this.handleError));
  }

  private handleError(errorResp: any) {
    let errorMessage = 'An unknown error has occured!';
    if (!errorResp || !errorResp.error || !errorResp.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResp.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email already exists';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Operation not allowed';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'Too many attempts. Please try again later';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email not found';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Password is invalid';
        break;
      case 'USER_DISABLED':
        errorMessage = 'User is disabled';
        break;
      default:
        break;
    }
    return throwError(errorMessage);
  }
}
