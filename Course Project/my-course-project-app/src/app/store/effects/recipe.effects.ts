import { Actions, Effect, ofType } from '@ngrx/effects'
import * as RecipesActions from '../actions/recipe.action'
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../../components/recipes/models/recipe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

@Injectable()
export class RecipeEffects {

    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(() => {
            return this.http
                .get<Recipe[]>('https://ng-course-recipe-book-d6790.firebaseio.com/recipes.json')
        }),
        map(recipes => {
            return recipes.map(recipe => {
                return {
                    ...recipe,
                    ingredients: recipe.ingredients ? recipe.ingredients : []
                }
            })
        }),
        map(recipes => {
            return new RecipesActions.SetRecipes(recipes)
        })
    )

    @Effect({dispatch: false})
    storeRecipes = this.actions$.pipe(
        ofType(RecipesActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => {
            return this.http.put(
                'https://ng-course-recipe-book-d6790.firebaseio.com/recipes.json',
                recipesState.recipes
            );
        })
    )

    constructor(private actions$: Actions, private http: HttpClient, private store: Store<AppState>) { }
}