import { Ingredient } from "../shared/ingridient-model";

const initialState = {
    ingredients: [
        new Ingredient('Apples',5),
        new Ingredient('Tomatos',10)
      ]
};

export function shoppingListReducer(state = initialState, action){

}