import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn: 'root'})

export class DataStorageService {
    constructor(
      private http: HttpClient, 
      private recipeService: RecipeService,
      private authService: AuthService){}

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        return this.http
        .put(
          'https://ng-course-recipe-book-92fb1-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
          recipes
          )
        .subscribe(response =>{
            console.log(response);
        });
    }

    fetchRecipes(){
      // console.table(this.authService.user);
      return this.authService.user //user is now behaviorsubject
        .pipe(
          take(1), //take just first object, first / latest user and unsubscribe automaticaly
          exhaustMap(user => { //use for work with two observables
            return this.http.get<Recipe[]>(
              'https://ng-course-recipe-book-92fb1-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', //or '?auth=' + user.token
              {
                params: new HttpParams().set('auth', user.token)
              }
            );
          }),
          map(recipes => { //move operators from second observable to group of observables
            return recipes.map(recipe => {//prevent before error of empty object
                return {
                  ...recipe, 
                  ingredients: recipe.ingredients ? recipe.ingredients : []};
            });
          }),
          tap(recipes => { //move operators from second observable to group of observables
            this.recipeService.setRecipes(recipes);
          })
          )
        }
}