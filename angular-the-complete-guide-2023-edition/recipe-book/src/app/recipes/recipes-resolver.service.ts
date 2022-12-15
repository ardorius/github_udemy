import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { from, map, Observable, of, switchMap, take } from "rxjs";
// import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
// import { RecipeService } from "./recipe.service";
import { Actions, ofType } from '@ngrx/effects';

import * as fromApp from '../store/app.reducer';
import * as RecipeActions from '../recipes/store/recipe.action';

@Injectable({providedIn: 'root'})

export class RecipesResolverService implements Resolve<Recipe[]>{
    constructor(
        // private dataStorageService: DataStorageService, 
        // private recipeService: RecipeService,
        private store: Store<fromApp.AppState>,
        private actions$: Actions){}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        // const recipes = this.recipeService.getRecipes();
        // if( recipes.length ===0){
            // return this.dataStorageService.fetchRecipes();
        return this.store.select('recipes').pipe(
            take(1),
            map(recipesState => {
                return recipesState.recipes;
            }),
            switchMap(recipes => {
                if(recipes.length === 0){
                    this.store.dispatch(new RecipeActions.FetchRecipes());
                    return this.actions$.pipe(
                        ofType(RecipeActions.SET_RECIPES), 
                        take(1)
                    );
                } else {
                    return of(recipes)
                }
            })
            );
            // this.store.dispatch(new RecipeActions.FetchRecipes());
            // return this.actions$.pipe(ofType(RecipeActions.SET_RECIPES), take(1));
    } 
        // else{
        //     return recipes;
        // }
        
    // }
}