import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}

  isAuthenticated = false;
  private userSub$: Subscription;

  ngOnInit(): void {
    this.userSub$ = this.authService.user$.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe(
      recipes => console.log(recipes),
      error => console.log(error.statusText)
    );
  }

  ngOnDestroy(): void {
    this.userSub$.unsubscribe();
  }
}
