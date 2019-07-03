import { Ingredient } from '../shared/models/ingredient.model';
import { User } from '../auth/auth/user.model';

export interface State {
    ingredients: Ingredient[]
    editedIngredient: Ingredient,
    editedIngredientIndex: number
}

export interface AppState {
    shoppingList: State;
    auth: AuthState
}

export interface AuthState {
    user: User
}