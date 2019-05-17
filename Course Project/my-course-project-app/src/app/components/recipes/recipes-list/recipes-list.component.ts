import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Recipe } from '../models/recipe.model'

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: Array<Recipe> = [
    new Recipe('A Test Recipe', 'This is a simply a test', 'https://food-images.files.bbci.co.uk/food/recipes/really_good_kedgeree_75198_16x9.jpg'),
    new Recipe('A Test Recipe 2', 'This is a simply a test 2', 'https://food-images.files.bbci.co.uk/food/recipes/really_good_kedgeree_75198_16x9.jpg')
  ];
  
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  
  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe){
    this.recipeWasSelected.emit(recipe);
  }
}
