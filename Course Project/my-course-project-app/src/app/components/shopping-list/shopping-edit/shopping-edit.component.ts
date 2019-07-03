import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../../shared/models/ingredient.model';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../../../store/actions/shopping-list.action'
import * as fromAppSate  from '../../../store/app.state';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingListForm') shoppingListForm: NgForm
  subs: Subscription
  editMode = false;
  editedIngredient: Ingredient

  constructor(private shoppingListService: ShoppingListService,  private store: Store<fromAppSate.AppState>) { }

  ngOnInit() {
    this.subs = this.store.select('shoppingList').subscribe(stateData => {
      if(stateData.editedIngredientIndex > -1){
        this.editMode = true;
        this.editedIngredient = stateData.editedIngredient;
        this.shoppingListForm.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount
          });
      } else {
        this.editMode = false;
      }
    })
    /* this.subs = this.shoppingListService.startedEditing
    .subscribe((inedx: number) => {
      this.editMode = true;
      this.editedIdemIndex = inedx;
      this.editedIngredient = this.shoppingListService.getIngredient(this.editedIdemIndex);
      this.shoppingListForm.setValue({
        name: this.editedIngredient.name,
        amount: this.editedIngredient.amount
        });
      }); */
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit(null))
  }

  onSubmit(form: NgForm){
    const name:string = form.value.name;
    const amount: number = form.value.amount;

    const ingredient = new Ingredient(name, amount)
    if(this.editMode){
      //this.shoppingListService.updateIngredient(this.editedIdemIndex, name,amount)
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(ingredient))
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
    this.store.dispatch(new ShoppingListActions.StopEdit(null))
  }

  onDelete(){
    //this.shoppingListService.deleteIngredientByid(this.editedIdemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(null))
    this.onClearForm();
  }
}
