import { AuthState } from '../app.state';
import * as AuthActions from '../actions/auth.action';
import { User } from '../../auth/auth/user.model';

const initialState : AuthState = {
    user: null
};

export function authReducer(state: AuthState = initialState, action: AuthActions.AuthActions) {
    switch(action.type){
        case AuthActions.LOGIN:
            const user = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate);
            return {
                ...state,
                user: user
            }
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            }
        default: 
            return state;
    }
    
}