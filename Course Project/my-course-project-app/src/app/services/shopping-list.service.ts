import { Ingredient } from '../shared/models/ingredient.model';
import { Subject } from 'rxjs';


export class ShoppingListService {

  newIngredientEvent = new Subject();
  startedEditing = new Subject<number>();

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
    this.newIngredientEvent.next();
  }

  addIndgredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients)
    this.newIngredientEvent.next();
  }

  getIngredient(index: number) : Ingredient{
    return this.ingredients[index]
  }

  updateIngredient(index: number, name: string, amount: number) {
    this.ingredients[index].name = name;
    this.ingredients[index].amount = amount;
    this.newIngredientEvent.next();
  }

  deleteIngredientByid(index: number){
    this.ingredients.splice(index, 1);
    this.newIngredientEvent.next();
  }
}
