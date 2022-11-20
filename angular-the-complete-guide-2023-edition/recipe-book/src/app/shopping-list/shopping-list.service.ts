import { Directive, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingridient-model';

@Directive({
  selector:'[appShoppingListService]'
})

export class ShoppingListService {
  startedEditing = new Subject<number>();
  // ingredientAdded = new EventEmitter<Ingredient[]>();
  ingredientAdded = new Subject<Ingredient[]>();

  private ingredients:Ingredient[] = [
    new Ingredient('Apples',5),
    new Ingredient('Tomatos',10)
  ];

  constructor() { }

  getIngredients(){
    return this.ingredients.slice();

    //return this.ingredients;
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    // this.ingredientAdded.emit(this.ingredients.slice());
    this.ingredientAdded.next(this.ingredients.slice());
  }

  editIngrediet(index: number, ingredient: Ingredient){
    this.ingredients[index] = ingredient;
    this.ingredientAdded.next(this.ingredients.slice());
  }

  deleteIngredient(index: number){
    // this.ingredients[index] = ingredient;
    this.ingredients.splice(index, 1);
    this.ingredientAdded.next(this.ingredients.slice());
  }

  addAllIngredients(ingredients: Ingredient[]){
    // for (let ingredient of ingredients){
    //   this.addIngredients(ingredient);
    // }
    this.ingredients.push(...ingredients);
    // this.ingredientAdded.emit(this.ingredients.slice());
    this.ingredientAdded.next(this.ingredients.slice());
    window.alert('Ingredients added to Shopping List!!!');
  }

  getIngredient(index: number){
    return this.ingredients[index];
  }
}
