import { ActionReducerMap } from '@ngrx/store';
import { shoppingListReducer } from './reducers/shopping-list.reducer';
import { authReducer } from './reducers/auth.reducer';
import { AppState } from './app.state';

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: shoppingListReducer,
    auth: authReducer
}