import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { AuthResponseData } from './auth-response-data.model';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  @ViewChild(PlaceholderDirective) placeholderDirective: PlaceholderDirective;
  isLoginMode = true;
  isLoading = false;
  // error: string = null;

  private authObs$: Observable<AuthResponseData>;
  private authSub: Subscription;
  private alertSub: Subscription;

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

    this.authSub = this.authObs$.subscribe(
      authResponseData => {
        console.log(authResponseData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        console.log(errorMessage);
        // this.error = errorMessage;
        this.isLoading = false;
        this.showAlert(errorMessage);
      }
    );

    authForm.reset();
  }

  // onHandleError() {
  //   this.error = null;
  // }

  showAlert(message: string) {
    const compFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    this.placeholderDirective.viewContainerRef.clear();
    const compRef = this.placeholderDirective.viewContainerRef.createComponent(compFactory);
    compRef.instance.message = message;
    this.alertSub = compRef.instance.acknowledge.subscribe(() => {
      this.alertSub.unsubscribe();
      this.placeholderDirective.viewContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
    if (this.alertSub) {
      this.alertSub.unsubscribe();
    }
  }
}
