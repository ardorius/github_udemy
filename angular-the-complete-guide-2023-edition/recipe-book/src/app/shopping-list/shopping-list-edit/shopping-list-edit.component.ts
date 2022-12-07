import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingridient-model';
// import { ShoppingListService } from '../shopping-list.service';

import * as ShoppingListActions from '../store/shopping-list.actions';
// import * as fromShoppingList from '../store/shopping-list.reducer';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  subs: Subscription;
  editMode : boolean = false;
  // editedItemIndex: number;
  editedItem: Ingredient;

  @ViewChild('f',{static: false}) submittedForm : NgForm;

  // @ViewChild('nameInput',{static:false}) nameInputRef: ElementRef;
  // @ViewChild('amountInput',{static:false}) amountIputRef: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(
    //private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>
    ) { }

  ngOnInit(): void {
    this.subs = this.store.select('shoppingList').subscribe(stateData =>{
      if (stateData.editedIngredientIndex > -1){
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        // this.editedItemIndex = stateData.editedIngredientIndex;
        this.submittedForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }else{
        this.editMode = false;
      }
    });

    // this.subs = this.shoppingListService.startedEditing.subscribe(
    //   (index: number) => {
    //     this.editMode = true;
    //     this.editedItemIndex = index;
    //     this.editedItem = this.shoppingListService.getIngredient(index);
    //     this.submittedForm.setValue({
    //       name: this.editedItem.name,
    //       amount: this.editedItem.amount
    //     });
    //   }
    // );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const ingName = value.name;
    const ingAmount = value.amount;
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountIputRef.nativeElement.value;
    const newIngredient =  new Ingredient(ingName, ingAmount);
      
    if(!this.editMode){
      // this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }else{
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(
        newIngredient
        ));
    }
    this.editMode = false;
    this.submittedForm.reset();
  }

  onClear(){
    this.editMode = false;
    // this.submittedForm.reset();    
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete(){
    // this.editMode = false;
    this.store.dispatch(
      new ShoppingListActions.DeleteIngredient()
    );
    this.onClear();
    // this.shoppingListService.deleteIngredient(this.editedItemIndex);
     }
}
