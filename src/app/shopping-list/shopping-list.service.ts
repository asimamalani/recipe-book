import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable()
export class ShoppingListService {
  constructor() {}

  ingredientsChanged$ = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [new Ingredient('Tomatoes', 5), new Ingredient('Apples', 10)];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged$.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged$.next(this.ingredients.slice());
  }
}
