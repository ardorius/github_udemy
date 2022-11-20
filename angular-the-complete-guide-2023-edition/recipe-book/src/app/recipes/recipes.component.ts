import { Component, OnInit } from '@angular/core';
// import { Ingredient } from '../shared/ingridient-model';
// import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
  // providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

  // selectedRecipe: Recipe;

  // private selectedRedcipeSubs: Subscription; // no need, because it is loaded before routing

  // constructor(private recipeService:RecipeService) { }

  constructor(){}
  
  ngOnInit(): void {
    // this.recipeService.recipeSelected.subscribe(
    //   (recipe: Recipe) => {
    //     this.selectedRecipe = recipe
    //   }
    // );
  }

  // ngOnDestroy(): void {
  //   this.selectedRedcipeSubs.unsubscribe();
  // }
}
