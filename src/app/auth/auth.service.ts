import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import * as fromApp from '../store/app-reducer';
import { AuthRequestBody } from './auth-request-body.model';
import { AuthResponseData } from './auth-response-data.model';
import * as AuthActions from './store/auth-actions';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>) {}

  // user$ = new BehaviorSubject<User>(null);
  private interval: any;

  signup(email: string, password: string) {
    return this.sendAuthRequest(email, password, 'signUp');
  }

  login(email: string, password: string) {
    return this.sendAuthRequest(email, password, 'signInWithPassword');
  }

  autologin() {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (!user) {
      return;
    }
    const tokenExpirationDate = new Date(user._tokenExpirationDate);
    this.autologout(tokenExpirationDate.getTime() - new Date().getTime());
    // const loggedInUser = new User(user.email, user.id, user._token, tokenExpirationDate);
    // this.user$.next(loggedInUser);
    this.store.dispatch(
      new AuthActions.Login({
        email: user.email,
        token: user._token,
        tokenExpirationDate,
        userId: user.id,
      })
    );
  }

  logout() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = null;
    // this.user$.next(null);
    this.store.dispatch(new AuthActions.Logout());
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
  }

  autologout(timeout: number) {
    this.interval = setTimeout(() => {
      this.logout();
    }, timeout);
  }

  private sendAuthRequest(email: string, password: string, action: string) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${action}?key=${environment.firebaseApiKey}`;
    const authRequestBody = { email, password, returnSecureToken: true } as AuthRequestBody;
    return this.http
      .post<AuthResponseData>(url, authRequestBody)
      .pipe(catchError(this.handleError), tap(this.handleAuthentication.bind(this)));
  }

  private handleAuthentication(authRes: AuthResponseData) {
    if (authRes) {
      const expiresInMill = +authRes.expiresIn * 1000;
      this.autologout(expiresInMill);
      const tokenExpirationDate = new Date(new Date().getTime() + expiresInMill);
      const user = new User(authRes.email, authRes.localId, authRes.idToken, tokenExpirationDate);
      // this.user$.next(user);
      this.store.dispatch(
        new AuthActions.Login({
          email: authRes.email,
          token: authRes.idToken,
          tokenExpirationDate,
          userId: authRes.localId,
        })
      );
      localStorage.setItem('userData', JSON.stringify(user));
    }
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
