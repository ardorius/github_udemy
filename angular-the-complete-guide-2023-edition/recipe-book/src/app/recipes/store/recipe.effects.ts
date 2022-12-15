import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipe.action';

@Injectable()

export class RecipeEffects {

    fetchRecipes = createEffect(
        () =>  this.actions$.pipe(ofType(RecipesActions.FETCH_RECIPES),
        switchMap(() => {
            return this.http.get<Recipe[]>(
                'https://ng-course-recipe-book-92fb1-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', //or '?auth=' + user.token
            );
        }),
        map(recipes => { //move operators from second observable to group of observables
            return recipes.map(recipe => {//prevent before error of empty object
                return {
                ...recipe, 
                ingredients: recipe.ingredients ? recipe.ingredients : []
                };
              });
            }),
        
        map(recipes => {
            return new RecipesActions.SetRecipes(recipes);
        })
        )
    )

    constructor(private actions$: Actions, private http: HttpClient){}
}