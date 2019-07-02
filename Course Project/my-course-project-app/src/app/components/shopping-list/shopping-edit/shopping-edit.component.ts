import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../../shared/models/ingredient.model';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../../../store/actions/shopping-list.action'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingListForm') shoppingListForm: NgForm
  subs: Subscription
  editMode = false;
  editedIdemIndex: number;
  editedIngredient: Ingredient

  constructor(private shoppingListService: ShoppingListService,  private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit() {
    this.subs = this.shoppingListService.startedEditing
    .subscribe((inedx: number) => {
      this.editMode = true;
      this.editedIdemIndex = inedx;
      this.editedIngredient = this.shoppingListService.getIngredient(this.editedIdemIndex);
      this.shoppingListForm.setValue({
        name: this.editedIngredient.name,
        amount: this.editedIngredient.amount
        });
      });
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

  onSubmit(form: NgForm){
    const name:string = form.value.name;
    const amount: number = form.value.amount;

    const ingredient = new Ingredient(name, amount)
    if(this.editMode){
      //this.shoppingListService.updateIngredient(this.editedIdemIndex, name,amount)
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({index: this.editedIdemIndex, ingredient: ingredient}))
    }
    else{
      //this.shoppingListService.addIndregient(name, amount)
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient))
    }

    this.onClearForm();
  }

  onClearForm(){
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete(){
    //this.shoppingListService.deleteIngredientByid(this.editedIdemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedIdemIndex))
    this.onClearForm();
  }
}
