import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/models/ingredient.model';


export class ShoppingListService {

  newIngredientEvent = new EventEmitter();

  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  constructor() { }

  getIngredients(){
    return this.ingredients.slice();
  }

  addIndregient(name: string, amount: number){
    const newIngredient = new Ingredient(name, amount);
    this.ingredients.push(newIngredient);
    this.newIngredientEvent.emit();
  }

  addIndgredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients)
    this.newIngredientEvent.emit();
  }
}
