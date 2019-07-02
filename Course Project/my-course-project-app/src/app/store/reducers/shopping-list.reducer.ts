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
            return {
            
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                
            };
        default: 
        return state;
    }
}