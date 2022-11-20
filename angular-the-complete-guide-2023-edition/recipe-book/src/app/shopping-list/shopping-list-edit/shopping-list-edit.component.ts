import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingridient-model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  subs: Subscription;
  editMode : boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  @ViewChild('f',{static: false}) submittedForm : NgForm;

  // @ViewChild('nameInput',{static:false}) nameInputRef: ElementRef;
  // @ViewChild('amountInput',{static:false}) amountIputRef: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
    this.subs = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.submittedForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const ingName = value.name;
    const ingAmount = value.amount;
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountIputRef.nativeElement.value;
    const newIngredient =  new Ingredient(ingName, ingAmount);
      
    if(!this.editMode){
    this.shoppingListService.addIngredient(newIngredient);
    }else{
      this.shoppingListService.editIngrediet(this.editedItemIndex, newIngredient);
    }
    this.editMode = false;
    this.submittedForm.reset();
  }

  onClear(){
    this.editMode = false;
    this.submittedForm.reset();    
  }

  onDelete(){
    this.editMode = false;
    this.onClear();
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
  }
}
