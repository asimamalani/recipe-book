import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor() {}

  private recipes: Recipe[] = [
    new Recipe(
      'Pizza',
      'A tasty cheese pizza!',
      'https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/a019-jakubk-0793-crusty-pizza-with-salami-mushrooms-onion.jpg?w=800&dpr=1&fit=default&crop=default&auto=format&fm=pjpg&q=75&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=5e653010dd06591c50b3bd75aa332dc6'
    ),
    new Recipe(
      'Coal fired pizza',
      'Looks Yummy!!!',
      'https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/a019-jakubk-0760-homemade-pizza1.jpg?w=800&dpr=1&fit=default&crop=default&auto=format&fm=pjpg&q=75&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=5d06439b389e718a1d12e8797e55a9f1'
    ),
  ];

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }
}
