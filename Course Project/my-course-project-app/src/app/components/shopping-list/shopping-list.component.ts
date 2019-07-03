import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/models/ingredient.model'
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromAppSate from '../../store/app.state';
import * as ShoppingListActions from '../../store/actions/shopping-list.action'


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}>;
  private igChangeSub: Subscription

  constructor(
    private shoppingListService: ShoppingListService, 
    private store: Store<fromAppSate.AppState>
  ) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList')
    //this.ingredients = this.shoppingListService.getIngredients();
    //this.igChangeSub = this.shoppingListService.newIngredientEvent.subscribe(() => this.ingredients = this.shoppingListService.getIngredients())
  }

  ngOnDestroy() {
    //this.igChangeSub.unsubscribe();
  }

  onEditItem(index: number){
    //this.shoppingListService.startedEditing.next(index)
    this.store.dispatch(new ShoppingListActions.StartEdit(index))
  }
}
