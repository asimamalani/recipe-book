import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as fromApp from '../../store/app-reducer';
import * as ShoppingListActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromApp.AppState>) {}

  @ViewChild('f') form: NgForm;

  private sub: Subscription;
  editMode = false;

  ngOnInit(): void {
    this.sub = this.store.select('shoppingList').subscribe(state => {
      if (state.editedIngredientIndex > -1) {
        this.editMode = true;
        const ingredient = state.editedIngredient;
        this.form.setValue({
          name: ingredient.name,
          amount: ingredient.amount,
        });
      } else {
        this.editMode = false;
      }
    });
  }

  onSubmit() {
    const formValue = this.form.value;
    const name = formValue.name;
    const amount = formValue.amount;
    const ingredient = new Ingredient(name, +amount);
    if (this.editMode) {
      // this.slService.updateIngredient(this.editedIndex, ingredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(ingredient));
    } else {
      // this.slService.addIngredient(ingredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
    }
    this.onClear();
  }

  onDelete() {
    // this.slService.deleteIngredient(this.editedIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.form.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
