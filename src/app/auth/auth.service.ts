import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRequestBody } from './auth-request-body.model';
import { AuthResponseData } from './auth-response-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    const authRequestBody = <AuthRequestBody>{ email: email, password: password, returnSecureToken: true };
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD0Yn7pyeEcdkztLYpPD-9-EdC4Lkn4dz4',
      authRequestBody
    );
  }
}
