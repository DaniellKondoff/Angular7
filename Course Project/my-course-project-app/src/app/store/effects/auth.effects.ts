import { Actions, ofType, Effect } from '@ngrx/effects'
import * as AuthActions from '../actions/auth.action'
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthResponseData, AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../auth/auth/user.model';

const handleAuth = (email: string, userId: string, token: string, expiresIn: number) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user))
    return new AuthActions.AuthSuccess({ email: email, userId: userId, token: token, expirationDate: expirationDate });
}

const handleError = (errorRes: any) => {
    let errorMsg = 'An unknow error occured!'

    if (!errorRes.error || !errorRes.error.error) {
        return of(new AuthActions.AuthFail(errorMsg))
    }

    switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
            errorMsg = 'This email already exists'
            break;
        case 'EMAIL_NOT_FOUND':
            errorMsg = 'This email does not exists'
            break;
        case 'INVALID_PASSWORD':
            errorMsg = 'This password is not correct'
            break;
    }

    return of(new AuthActions.AuthFail(errorMsg));
}

@Injectable()
export class AuthEffects {

    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signUpActions: AuthActions.SignupStart) => {
            return this.http.post<AuthResponseData>(
                'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + environment.firebaseAPIKey,
                {
                    email: signUpActions.payload.email,
                    password: signUpActions.payload.password,
                    returnSecureToken: true
                }
            )
                .pipe(
                    tap(resData => {
                        this.authService.setLogoutTimer(+resData.expiresIn * 1000)
                    }),
                    map(resData => {
                        return handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes)
                    })
                )
        })
    )

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + environment.firebaseAPIKey,
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }
            ).pipe(
                tap(resData => {
                    this.authService.setLogoutTimer(+resData.expiresIn * 1000)
                }),
                map(resData => {
                    return handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
                }),
                catchError(errorRes => {
                    return handleError(errorRes)
                })
            );
        }),
    );

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
            const userData: {
                email: string;
                id: string;
                _token: string;
                _tokenExpirationDate: string;
            } = JSON.parse(localStorage.getItem('userData'));
            if (!userData) {
                return { type: 'Auth' }
            }

            const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

            if (loadedUser.token) {
                const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.authService.setLogoutTimer(expirationDuration)
                return new AuthActions.AuthSuccess({ email: loadedUser.email, userId: loadedUser.id, token: loadedUser.token, expirationDate: new Date(userData._tokenExpirationDate) })               
            }

            return { type: 'Auth' }
        })
    )

    @Effect({ dispatch: false })
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.AUTH_SUCCESS),
        tap(() => {
            this.router.navigate(['/']);
        })
    );

    @Effect({ dispatch: false })
    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            this.authService.clearLogoutTimer();
            localStorage.clear();
            this.router.navigate(['/auth']);
        })
    )

    constructor(private actions$: Actions, private http: HttpClient, private router: Router, private authService: AuthService) { }

}