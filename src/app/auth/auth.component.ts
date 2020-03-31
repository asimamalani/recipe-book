import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(private authService: AuthService) {}

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }

    this.isLoading = true;
    if (this.isLoginMode) {
      // do something
    } else {
      const email = authForm.value.email;
      const password = authForm.value.password;
      this.authService.signup(email, password).subscribe(
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
    }

    authForm.reset();
  }
}
