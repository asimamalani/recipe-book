import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData } from './auth-response-data.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService) {}

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  private authObs$: Observable<AuthResponseData>;
  private authSub$: Subscription;

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }

    this.isLoading = true;

    const email = authForm.value.email;
    const password = authForm.value.password;
    if (this.isLoginMode) {
      this.authObs$ = this.authService.login(email, password);
    } else {
      this.authObs$ = this.authService.signup(email, password);
    }

    this.authSub$ = this.authObs$.subscribe(
      authResponseData => {
        console.log(authResponseData);
        this.isLoading = false;
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    authForm.reset();
  }

  ngOnDestroy(): void {
    this.authSub$.unsubscribe();
  }
}
