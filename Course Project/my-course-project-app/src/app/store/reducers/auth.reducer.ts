import { AuthState } from '../app.state';
import * as AuthActions from '../actions/auth.action';
import { User } from '../../auth/auth/user.model';

const initialState : AuthState = {
    user: null,
    authError: null,
    loading: false
};

export function authReducer(state: AuthState = initialState, action: AuthActions.AuthActions) {
    switch(action.type){
        case AuthActions.AUTH_SUCCESS:
            const user = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate);
            return {
                ...state,
                authError: null,
                user: user,
                loading: false
            }
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            }
        case AuthActions.LOGIN_START:
        case AuthActions.SIGNUP_START:
            return {
                ...state,
                authError: null,
                loading: true
            }
        case AuthActions.AUTH_FAIL:
            return {
                ...state,
                user: null,
                authError: action.payload,
                loading: false
            }
        case AuthActions.CLEAR_ERROR:
            return {
                ...state,
                authError: null
            }
        default: 
            return state;
    }
    
}