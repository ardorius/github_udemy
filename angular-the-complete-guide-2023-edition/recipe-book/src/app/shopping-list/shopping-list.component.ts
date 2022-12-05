import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingridient-model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ingredients: Ingredient[]}> ;
  private subs: Subscription;

  constructor(
    private shoppingListService:ShoppingListService,
    private loggingService: LoggingService,
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>
    ) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.subs = this.shoppingListService.ingredientAdded.subscribe(
    //     (ingredient: Ingredient[]) => {
    //       this.ingredients = ingredient
    //     }
    //   )

      this.loggingService.printLog('Hello from shopping')
  }
  ngOnDestroy(): void {
    // this.subs.unsubscribe()
  }

  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index);
  }

  // onIngridientAdded(ingredient: Ingredient){
  //   this.ingredients.push(ingredient);
  // }

}
