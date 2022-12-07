import { Directive, EventEmitter, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingridient-model';
// import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';

@Injectable()

@Directive({
  selector:'[appRecipeService]'
})

export class RecipeService {

  // recipeSelected = new EventEmitter<Recipe>();
  recipeSelected = new Subject<Recipe[]>();

  constructor(
    // private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
    ) { }

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'GREEN BEANS WITH BACON AND NEW POTATOES', 
  //     'Cook the bacon pieces in a large sauce pan over medium heat for 5 minutes.  orange quote icon Wash hands with soap and water after handling bacon.', 
  //     'https://fruitsandveggies.org/wp-content/uploads/2019/02/2017-StoryDinner-SouthernBeansPotatoes-Final-558x439.jpg',
  //     [
  //       new Ingredient('Beans',100),
  //       new Ingredient('Potatos',20)
  //     ]
  //   ),
  //   new Recipe(
  //     'EASY CHICKEN AND VEGETABLE STIR-FRY', 
  //     'Add onion, carrots, 3/4 cup of the broth, the soy sauce and sugar. Cover and cook over medium heat 5 minutes, stirring twice.', 
  //     'https://www.eatwell101.com/wp-content/uploads/2021/01/Chicken-Stir-Fry-Recipe.jpg',
  //     [
  //       new Ingredient('Chicken',2),
  //       new Ingredient('Onions', 3)
  //     ]
  //   )
  // ];

  private recipes: Recipe[] = [];

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipeSelected.next(this.recipes.slice());
  }

  getRecipes(){
      return this.recipes;
    }
  // getRecipes(){
  //   return this.recipes.slice();
  // }
  getRecipe(index: number){
    const recipe = this.recipes[index];
    return recipe;
  }
  
  addIngredientsToShoppingList(ingredient: Ingredient[]){
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredient))
    // this.shoppingListService.addAllIngredients(ingredient);
    // this.recipes..ingredients.forEach(ingredient => {
    //       this.shoppingListService.addIngredient({name: ingredient.name, amount: ingredient.amount});
    //     });
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipeSelected.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipeSelected.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipeSelected.next(this.recipes.slice());
  }
}
