import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/models/ingredient.model'
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.newIngredientEvent.subscribe(() => this.ingredients = this.shoppingListService.getIngredients())
  }
}
