import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from '../auth/auth/user.model';

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
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDak6orHVVdRsOEgctLvNsB1p_iPaKGm3Q',
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
    return this.http.post<AuthResponseData>('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDak6orHVVdRsOEgctLvNsB1p_iPaKGm3Q',
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(catchError(this.handleError), tap(respData=> {
        this.handleAuth(respData.email, respData.localId, respData.idToken, +respData.expiresIn)
      }))
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
    this.user.next(user);
  }
}
