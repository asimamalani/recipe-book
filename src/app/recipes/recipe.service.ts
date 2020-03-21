import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  constructor(private slService: ShoppingListService) {}

  selectedRecipe = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel, just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Schnitzel.JPG/1024px-Schnitzel.JPG',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Veggie_burger_flickr_user_divinemisscopa_creative_commons.jpg/1024px-Veggie_burger_flickr_user_divinemisscopa_creative_commons.jpg',
      [new Ingredient('Veggie Patty', 1), new Ingredient('Buns', 2), new Ingredient('French Fries', 10)]
    ),
  ];

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingreditents: Ingredient[]) {
    this.slService.addIngredients(ingreditents);
  }
}
