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
    return this.http.post<AuthResponseData>(url, authRequestBody).pipe(
      catchError(errorResp => {
        let errorMessage = 'An unknown error has occured!';
        if (!errorResp.error || !errorResp.error.error) {
          return throwError(errorMessage);
        }
        switch (errorResp.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'Email already exists';
            break;
          default:
            break;
        }
        return throwError(errorMessage);
      })
    );
  }

  login(email: string, password: string) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
    const authRequestBody = { email, password, returnSecureToken: true } as AuthRequestBody;
    return this.http.post<AuthResponseData>(url, authRequestBody).pipe(
      catchError(errorResp => {
        let errorMessage = 'An unknown error has occured!';
        if (!errorResp.error || !errorResp.error.error) {
          return throwError(errorMessage);
        }
        switch (errorResp.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'Email already exists';
            break;
          default:
            break;
        }
        return throwError(errorMessage);
      })
    );
  }
}
