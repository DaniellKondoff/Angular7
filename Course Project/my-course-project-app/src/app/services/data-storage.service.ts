import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from './recipe.service';
import { Recipe } from '../components/recipes/models/recipe.model';
import {map, tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipesService: RecipeService) { }

  storeRecipes(){
    const recipes = this.recipesService.getRecipes();
    this.http.put(
      'https://ng-course-recipe-book-d6790.firebaseio.com/recipes.json',
      recipes
    )
    .subscribe(response => {
      console.log(response)
    });
  }

  fetchRecipe(){
    return this.http
        .get<Recipe[]>('https://ng-course-recipe-book-d6790.firebaseio.com/recipes.json')
        .pipe(map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe, 
              ingredients: recipe.ingredients ? recipe.ingredients : []
            }
          })
        }), tap(recipes => {
          this.recipesService.setRecipes(recipes)
        })
      )
  }
}
