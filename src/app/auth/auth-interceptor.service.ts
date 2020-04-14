import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app-reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      map(state => state.user),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const updatedRequest = req.clone({ params: req.params.append('auth', user.token) });
        return next.handle(updatedRequest);
      })
    );
  }
}
