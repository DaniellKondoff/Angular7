import { ActionReducerMap } from '@ngrx/store';
import { shoppingListReducer } from './reducers/shopping-list.reducer';
import { authReducer } from './reducers/auth.reducer';
import { AppState } from './app.state';
import { recipeReducer } from './reducers/recipe.reducer';

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: shoppingListReducer,
    auth: authReducer,
    recipes: recipeReducer
}