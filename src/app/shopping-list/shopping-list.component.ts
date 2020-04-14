import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as fromApp from '../store/app-reducer';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromShoppingList from './store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromApp.AppState>) {}

  private ingredientsSub: Subscription;

  ingredients: Observable<fromShoppingList.State>;

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.slService.getIngredients();
    // this.ingredientsSub = this.slService.ingredientsChanged$.subscribe(
    //   (ingredients: Ingredient[]) => (this.ingredients = ingredients)
    // );
  }

  onSelectItem(index: number) {
    // this.slService.ingredientSelected$.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy(): void {
    if (this.ingredientsSub) {
      this.ingredientsSub.unsubscribe();
    }
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
