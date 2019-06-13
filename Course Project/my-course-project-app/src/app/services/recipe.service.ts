import { Recipe } from '../components/recipes/models/recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  newRecipeEvent = new Subject();

  recipes: Array<Recipe> = [
 /*    new Recipe(
      1,
      'A Test Recipe', 
      'This is a simply a test', 
      'https://food-images.files.bbci.co.uk/food/recipes/really_good_kedgeree_75198_16x9.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe(
      2,
      'A Test Recipe 2', 
      'This is a simply a test 2', 
      'https://food-images.files.bbci.co.uk/food/recipes/really_good_kedgeree_75198_16x9.jpg', 
      [
        new Ingredient('Meat', 1),
        new Ingredient('Buns', 40)
      ]) */
  ];

  constructor(private slService: ShoppingListService) { }

  getRecipes(){
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIndgredients(ingredients)
  }

  getRecipeById(id: number) {
    return this.recipes[id]
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.newRecipeEvent.next()
  }

  updateRecipe(index:number, recipe: Recipe){
    this.recipes[index] = recipe;
    this.newRecipeEvent.next()
  }

  deleteRecipeById(index: number){
    this.recipes.splice(index, 1)
    this.newRecipeEvent.next()
  }

  setRecipes(recipes : Recipe[]){
    this.recipes = recipes
    this.newRecipeEvent.next()
  }
}
