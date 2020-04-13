import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  constructor(private slService: ShoppingListService, private store: Store<fromShoppingList.AppState>) {}

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
    this.slService.ingredientSelected$.next(index);
  }

  ngOnDestroy(): void {
    if (this.ingredientsSub) {
      this.ingredientsSub.unsubscribe();
    }
  }
}
