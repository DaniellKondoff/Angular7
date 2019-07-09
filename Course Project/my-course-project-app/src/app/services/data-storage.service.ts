import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../components/recipes/models/recipe.model';
import { map, tap } from 'rxjs/operators'
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import * as RecipesActions from '../store/actions/recipe.action'

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  fetchRecipe() {
    return this.http
      .get<Recipe[]>('https://ng-course-recipe-book-d6790.firebaseio.com/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            }
          })
        }), tap(recipes => {
          this.store.dispatch(new RecipesActions.SetRecipes(recipes))
        })
      )
  }
}
