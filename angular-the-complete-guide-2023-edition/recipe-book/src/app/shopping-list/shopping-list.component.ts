import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingridient-model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients:Ingredient[];
  private subs: Subscription;

  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subs = this.shoppingListService.ingredientAdded.subscribe(
        (ingredient: Ingredient[]) => {
          this.ingredients = ingredient
        }
      )
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index);
  }

  // onIngridientAdded(ingredient: Ingredient){
  //   this.ingredients.push(ingredient);
  // }

}
