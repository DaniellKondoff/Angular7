import { Action } from '@ngrx/store';
import { Recipe } from '../../components/recipes/models/recipe.model';

export const SET_RECIPES ='[RECIPES] SET_RECIPES'
export const FETCH_RECIPES = '[RECIPES] FETCH_RECIPES'
export const ADD_RECIPE = '[RECIPE] ADD_RECIPE'
export const UPDATE_RECIPE = '[RECIPE] UPDATE_RECIPE'
export const DELETE_RECIPE = '[RECIPE] DELETE_RECIPE'
export const STORE_RECIPES = '[RECIPEs] STORE_RECIPES'

export class SetRecipes implements Action {
    readonly type = SET_RECIPES;

    constructor(public payload: Recipe[]){}
}

export class FetchRecipes implements Action {
    readonly type = FETCH_RECIPES;

    constructor(public payload: null){}
}

export class AddRecipe implements Action {
    readonly type = ADD_RECIPE;

    constructor(public payload: Recipe){}
}

export class UpdateRecipe implements Action {
    readonly type = UPDATE_RECIPE;

    constructor(public payload: {index: number; newRecipe: Recipe}){}
}

export class DeleteRecipe implements Action {
    readonly type = DELETE_RECIPE;

    constructor(public payload: number){}
}

export class StoreRecipes implements Action {
    readonly type = STORE_RECIPES

    constructor(public payload: null){}
}

export type RecipesActions =
    | SetRecipes
    | AddRecipe
    | UpdateRecipe
    | DeleteRecipe
    | StoreRecipes