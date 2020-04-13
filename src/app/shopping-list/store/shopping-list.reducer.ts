import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface AppState {
  shoppingList: State;
}

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [new Ingredient('Tomatoes', 5), new Ingredient('Apples', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return { ...state, ingredients: [...state.ingredients, action.payload] };

    case ShoppingListActions.ADD_INGREDIENTS:
      return { ...state, ingredients: [...state.ingredients, ...action.payload] };

    case ShoppingListActions.UPDATE_INGREDIENT:
      const updatedIngredient: Ingredient = {
        ...state.ingredients[action.payload.index],
        name: action.payload.ingredient.name,
        amount: action.payload.ingredient.amount,
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[action.payload.index] = updatedIngredient;
      return { ...state, ingredients: updatedIngredients };

    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: [
          ...state.ingredients.filter((_value, index) => {
            return index !== action.payload;
          }),
        ],
      };
    default:
      return state;
  }
}
