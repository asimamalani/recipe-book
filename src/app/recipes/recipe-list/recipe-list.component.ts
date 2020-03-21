import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  constructor() {}

  @Output() selectedRecipe = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
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

  ngOnInit(): void {}

  onRecipeSelected(recipe: Recipe) {
    this.selectedRecipe.emit(recipe);
  }
}
