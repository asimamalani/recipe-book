import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  constructor(private slService: ShoppingListService) {}

  @ViewChild('ingredientName') ingredientName: ElementRef;
  @ViewChild('ingredientAmount') ingredientAmount: ElementRef;

  ngOnInit(): void {}

  onAdd() {
    const name = (this.ingredientName.nativeElement as HTMLInputElement).value;
    const amount = (this.ingredientAmount.nativeElement as HTMLInputElement).value;
    const ingredient = new Ingredient(name, +amount);
    this.slService.addIngredient(ingredient);
  }
}
