import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingridient-model";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';

export class AddIngredient implements Action{
    readonly type = ADD_INGREDIENT; // type is only force
    //payload: Ingredient //is optional

    constructor(public payload: Ingredient){
    
    }
}

export class AddIngredients implements Action{
    readonly type = ADD_INGREDIENTS;
    
    constructor(public payload: Ingredient[]){

    }
}

export type ShoppingListActions = AddIngredient | AddIngredients;