import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingridient-model";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export class AddIngredient implements Action{
    readonly type = ADD_INGREDIENT; // type is only force
    payload: Ingredient //is optional
}