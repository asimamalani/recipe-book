import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  constructor() {}

  ingredientsChanged$ = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [new Ingredient('Tomatoes', 5), new Ingredient('Apples', 10)];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged$.emit(this.ingredients);
  }
}
