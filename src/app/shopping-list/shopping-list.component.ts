import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  constructor(private slService: ShoppingListService) {}

  private ingChangedSub: Subscription;

  ingredients: Ingredient[];

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.ingChangedSub = this.slService.ingredientsChanged$.subscribe(
      (ingredients: Ingredient[]) => (this.ingredients = ingredients)
    );
  }

  onSelectItem(index: number) {
    this.slService.ingredientSelected$.next(index);
  }

  ngOnDestroy(): void {
    this.ingChangedSub.unsubscribe();
  }
}
