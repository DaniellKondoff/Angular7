import { Ingredient } from '../shared/models/ingredient.model';
import { User } from '../auth/auth/user.model';
import { Recipe } from '../components/recipes/models/recipe.model';

export interface State {
    ingredients: Ingredient[]
    editedIngredient: Ingredient,
    editedIngredientIndex: number
}

export interface AppState {
    shoppingList: State;
    auth: AuthState,
    recipes: RecipeState
}

export interface AuthState {
    user: User;
    authError: string;
    loading: boolean;
}

export interface RecipeState {
    recipes: Recipe[];
}