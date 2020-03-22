import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  constructor(private recipeService: RecipeService, private route: ActivatedRoute) {}

  @Input() recipe: Recipe;

  ngOnInit(): void {
    this.route.params.subscribe(params => (this.recipe = this.recipeService.getRecipe(+params.id)));
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingreditents);
  }
}
