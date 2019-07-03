import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from '../auth/auth/user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import * as AuthActions from '../store/actions/auth.action';

export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any

  constructor(private http: HttpClient, private router: Router, private store: Store<AppState>) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(respData => {
      this.handleAuth(respData.email, respData.localId, respData.idToken, +respData.expiresIn)
    }))
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(catchError(this.handleError), tap(respData=> {
        this.handleAuth(respData.email, respData.localId, respData.idToken, +respData.expiresIn)
      }))
  }

  logout(){
    //this.user.next(null);
    this.store.dispatch(new AuthActions.Logout(null))
    this.router.navigate(['/auth'])
    localStorage.clear();

    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer)
    }

    this.tokenExpirationTimer = null;
  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMsg = 'An unknow error occured!'

      if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMsg)
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

      return throwError(errorMsg)
  }

  private handleAuth(email: string, userId: string, token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    //this.user.next(user);
    this.store.dispatch(new AuthActions.Login({email: user.email,userId: user.id, token: user.token, expirationDate: expirationDate}))
    this.autoLogout(expiresIn * 1000)
    localStorage.setItem('userData', JSON.stringify(user))
  }

  autoLogin(){
    const userData: {
      email:string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
      return
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if(loadedUser.token){
      //this.user.next(loadedUser)
      this.store.dispatch(new AuthActions.Login({email: loadedUser.email,userId: loadedUser.id, token: loadedUser.token, expirationDate: new Date(userData._tokenExpirationDate)}))
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration)
    }
  }

  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
