import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registerd?: boolean;
}

@Injectable()
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDZhDZafXrJ4zjv7sxnzadBLXQYeQ5URCA',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(
        resData.email, 
        resData.localId, 
        resData.idToken, 
        +resData.expiresIn
      );
    }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDZhDZafXrJ4zjv7sxnzadBLXQYeQ5URCA',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(
        resData.email, 
        resData.localId, 
        resData.idToken, 
        +resData.expiresIn
      );
    }));
  }

  logout() {
    this.user.next(null);
  }

  private handleAuthentication(
    email: string, 
    userId: string, 
    token: string, 
    expiresIn: number
    ) {
      const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new User(
          email,
          userId,
          token,
          expirationDate
        );
      this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
        if(!errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage);
        }
        switch(errorRes.error.error.message) {
          case 'EMAIL_EXISTS': 
            errorMessage = 'This email exists already!';
            break;
          case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exist!';
            break;
          case 'INVALID_PASSWORD':
            errorMessage = 'The password is not correct!';
            break;
          case 'USER_DISABLED':
            errorMessage = 'Your account is disabled. Please contact the Administrator.';
            break;
          case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
            break;
        }
        return throwError(errorMessage);
  }

}