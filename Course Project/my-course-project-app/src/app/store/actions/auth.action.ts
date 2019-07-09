import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] LOGIN_START'
export const AUTH_SUCCESS = '[Auth] AUTH_SUCCESS'
export const AUTH_FAIL = '[Auth] AUTH_FAIL'
export const LOGOUT = '[Auth] LOGOUT'
export const SIGNUP_START = '[Auth] SIGNUP_START'
export const CLEAR_ERROR = '[Auth] CLEAR_ERROR'
export const AUTO_LOGIN = '[Auth] AUTO_LOGIN'

export class AuthSuccess implements Action {
    readonly type: string = AUTH_SUCCESS;

    constructor(public payload: {email: string, userId: string, token: string, expirationDate: Date, redirect: boolean}){}
}

export class Logout implements Action {
    readonly type: string = LOGOUT;

    constructor(public payload: null) {}
}

export class LoginStart implements Action {
    readonly type: string = LOGIN_START;

    constructor(public payload: any){}
}

export class AuthFail implements Action {
    readonly type: string = AUTH_FAIL;

    constructor(public payload: string){}
}

export class SignupStart implements Action {
    readonly type: string = SIGNUP_START;

    constructor(public payload: any){}
}

export class ClearError implements Action {
    readonly type: string = CLEAR_ERROR;

    constructor(public payload: null){}
}

export class AutoLogin implements Action {
    readonly type: string = AUTO_LOGIN;

    constructor(public payload: null){}
}

export type AuthActions = 
    | AuthSuccess 
    | Logout  
    | LoginStart 
    | AuthFail 
    | SignupStart 
    | ClearError 
    | AutoLogin