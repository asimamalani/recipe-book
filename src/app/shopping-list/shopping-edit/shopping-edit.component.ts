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

  private ingredientSub: Subscription;
  editMode = false;
  private editedIndex: number;

  ngOnInit(): void {
    this.ingredientSub = this.slService.ingredientSelected$.subscribe(ingIndex => {
      this.editMode = true;
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
    if (this.editMode) {
      this.slService.updateIngredient(this.editedIndex, ingredient);
    } else {
      this.slService.addIngredient(ingredient);
    }
    this.onClear();
  }

  onDelete() {
    this.slService.deleteIngredient(this.editedIndex);
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.form.reset();
  }

  ngOnDestroy() {
    this.ingredientSub.unsubscribe();
  }
}
