import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/models/ingredient.model'
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../../services/logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private igChangeSub: Subscription

  constructor(private shoppingListService: ShoppingListService,  private loggingService: LoggingService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.igChangeSub = this.shoppingListService.newIngredientEvent.subscribe(() => this.ingredients = this.shoppingListService.getIngredients())
    this.loggingService.printLog("ShoppingList Component")
  }

  ngOnDestroy() {
    this.igChangeSub.unsubscribe();
  }

  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index)
  }
}
