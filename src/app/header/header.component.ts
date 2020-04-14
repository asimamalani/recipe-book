import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app-reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  isAuthenticated = false;
  private userSub: Subscription;
  private recipeSub: Subscription;

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(map(state => state.user))
      .subscribe(user => {
        this.isAuthenticated = !!user;
      });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.recipeSub = this.dataStorageService.fetchRecipes().subscribe(
      recipes => console.log(recipes),
      error => console.log(error.statusText)
    );
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
    if (this.recipeSub) {
      this.recipeSub.unsubscribe();
    }
  }
}
