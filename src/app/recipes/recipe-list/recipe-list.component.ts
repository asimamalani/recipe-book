import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {}

  recipes: Recipe[];
  private recipesSub: Subscription;

  ngOnInit(): void {
    this.recipesSub = this.recipeService.recipesChanged$.subscribe(recipes => {
      this.recipes = recipes;
    });
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    if (this.recipesSub) {
      this.recipesSub.unsubscribe();
    }
  }
}
