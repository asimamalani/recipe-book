import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  constructor() {}

  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  @ViewChild('ingredientName') ingredientName: ElementRef;
  @ViewChild('ingredientAmount') ingredientAmount: ElementRef;

  ngOnInit(): void {}

  onAdd() {
    const name = (<HTMLInputElement>this.ingredientName.nativeElement).value;
    const amount = (<HTMLInputElement>this.ingredientAmount.nativeElement)
      .value;
    const ingredient = new Ingredient(name, +amount);
    this.ingredientAdded.emit(ingredient);
  }
}
