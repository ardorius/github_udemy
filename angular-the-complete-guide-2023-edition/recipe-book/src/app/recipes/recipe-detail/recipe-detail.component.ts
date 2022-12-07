import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
// import { Ingredient } from 'src/app/shared/ingridient-model';
// import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    //private shoppingListService:ShoppingListService,
    private recipeService:RecipeService,
    private route:ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    )
  }

  onExistRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route})
  }

  // addIngredients(){
  //   this.recipe.ingredients.forEach(ingredient => {
  //     this.shoppingListService.addIngredient({name: ingredient.name, amount: ingredient.amount});
  //   });
    
  // }

  addIngredients(){
   this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);    
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'])
  }
}
