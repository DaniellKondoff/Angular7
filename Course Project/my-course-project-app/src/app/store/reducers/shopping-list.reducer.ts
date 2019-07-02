import { Ingredient } from '../../shared/models/ingredient.model';
import * as ShoppingListActions from '../actions/shopping-list.action';

const initialState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ActionTypes) {
    switch(action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            console.log(action.payload)
            const ingredient = state.ingredients[action.payload.index] 
            console.log(ingredient)
            const updatedIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            };
            console.log(updatedIngredient)
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[action.payload.index] = updatedIngredient

            return {            
                ...state,
                ingredients: updatedIngredients
            };
        case ShoppingListActions.DELETE_INGREDIENT:

            return {
                ...state,
                ingredient: state.ingredients.filter((ig, igIndex) => {
                    return igIndex !== action.payload;
                })
            };
        default: 
        return state;
    }
}