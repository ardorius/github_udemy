import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.action';
import * as fromApp from '../store/recipe.reducer';

@Injectable()

export class RecipeEffects {

    fetchRecipes = createEffect(
        () =>  this.actions$.pipe(ofType(RecipeActions.FETCH_RECIPES),
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
            return new RecipeActions.SetRecipes(recipes);
        })
        )
    )

    storeRecipes = createEffect(
        () => this.actions$.pipe(
            ofType(RecipeActions.STORE_RECIPES),
            withLatestFrom(this.store.select('recipes')),
            switchMap(([actionData, recipesState]) => {
                return this.http
                .put(
                    'https://ng-course-recipe-book-92fb1-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
                    recipesState//recipe?
                    );
            }),
            map(recipes => {
                return new RecipeActions.StoreRecipes();
            })
            ), {dispatch: false}
    )

    constructor(
        private actions$: Actions, 
        private http: HttpClient, 
        private store: Store<fromApp.State>) { }
}