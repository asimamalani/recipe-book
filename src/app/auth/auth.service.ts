import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRequestBody } from './auth-request-body.model';
import { AuthResponseData } from './auth-response-data.model';
import { apiKey } from 'secret';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
    const authRequestBody = { email, password, returnSecureToken: true } as AuthRequestBody;
    return this.http.post<AuthResponseData>(url, authRequestBody);
  }
}
