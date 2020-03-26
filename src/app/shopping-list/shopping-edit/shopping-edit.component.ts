import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  constructor(private slService: ShoppingListService) {}

  @ViewChild('f') form: NgForm;

  private ingSelectedSub: Subscription;
  // private editMode = false;
  private editedIndex: number;

  ngOnInit(): void {
    this.ingSelectedSub = this.slService.ingredientSelected$.subscribe(ingIndex => {
      // this.editMode = true;
      this.editedIndex = ingIndex;
      const ingredient = this.slService.getIngredient(this.editedIndex);
      this.form.setValue({
        name: ingredient.name,
        amount: ingredient.amount,
      });
    });
  }

  onSubmit() {
    const formValue = this.form.value;
    const name = formValue.name;
    const amount = formValue.amount;
    const ingredient = new Ingredient(name, +amount);
    this.slService.addIngredient(ingredient);
  }

  ngOnDestroy() {
    this.ingSelectedSub.unsubscribe();
  }
}
