import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { Store } from '@ngrx/store';

import { User } from './user.model';
import { environment } from 'src/environments/environment';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

export interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //user = new Subject<User>();//replace subject for behaviorsubject
  // user = new BehaviorSubject<User>(null);//get previous value, for use fetch data 

  private tokenExpirationTimer : any;

  constructor(
    private http : HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>) { }

  // singUp(email: string, password: string){
  //   return this.http.post<AuthResponseData>(
  //     'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + 
  //     environment.firebaseAPIKey,
  //     {
  //       email: email,
  //       password: password,
  //       returnSecureToken: true
  //     }
  //   )
  //   .pipe(
  //     catchError(this.handlerError), 
  //     tap(responseData => {
  //       this.handleAuthentication(
  //         responseData.email, 
  //         responseData.localId, 
  //         responseData.idToken, 
  //         +responseData.expiresIn)
  //     })
  //     );    
  // }

  // login(email: string, password: string){
  //   return this.http.post<AuthResponseData>(
  //     'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + 
  //     environment.firebaseAPIKey,
  //     {
  //       email: email,
  //       password: password,
  //       returnSecureToken: true
  //     }
  //   )
  //   .pipe(
  //     catchError(this.handlerError),
  //     tap(responseData => {
  //       this.handleAuthentication(
  //         responseData.email, 
  //         responseData.localId, 
  //         responseData.idToken, 
  //         +responseData.expiresIn)
  //     }))
  // }

  autoLogin(){
    const userData :{
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData')); //transform from string to object
    if (!userData){
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    
    if(loadedUser.token){
      // this.user.next(loadedUser);
      this.store.dispatch(
        new AuthActions.AuthenticateSuccess({
          email: loadedUser.email, 
          userId: loadedUser.id, 
          token: loadedUser.token, 
          expirationDate: new Date(userData._tokenExpirationDate)
        })
      )
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();//check rest time

      this.autoLogout(expirationDuration);
    }
  
  }

  logout(){
    // this.user.next(null);
    this.store.dispatch(
      new AuthActions.Logout()
    );
    this.router.navigate(['/auth']);

    localStorage.removeItem('userData');//after logout clear userData

    if(this.tokenExpirationTimer){// if it's logout, check expirationtimer
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number){
    // console.log(expirationDuration);
   this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);//time to expire
  }

  private handleAuthentication(
    email: string, 
    userId: string, 
    token: string, 
    expiresIn: number
    ){
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);//need to be gettime otherwise expire time is not valid
      const user = new User(email, userId, token, expirationDate);
      // this.user.next(user);
      this.store.dispatch(
        new AuthActions.AuthenticateSuccess({
          email: email, 
          userId: userId, 
          token: token, 
          expirationDate: expirationDate
        })
      )
      this.autoLogout(expiresIn * 1000);
      localStorage.setItem('userData', JSON.stringify(user));//prevent from lose data
  }

  private handlerError(errorResponse: HttpErrorResponse){
    let errorMessage = 'An error occured!';
    if(!errorResponse.error || !errorResponse.error.error){
      return throwError(() => new Error(errorMessage));
    }
    switch (errorResponse.error.error.message){
      case 'EMAIL_EXISTS' : {
        errorMessage = 'The email address is already in use by another account.';
        break;
      }
      case 'OPERATION_NOT_ALLOWED' : {
        errorMessage = 'Password sign-in is disabled for this project.';
        break;
      }
      case 'TOO_MANY_ATTEMPTS_TRY_LATER' : {
        errorMessage =  'We have blocked all requests from this device due to unusual activity. Try again later.'
        break;
      }
      case 'EMAIL_NOT_FOUND' : {
        errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.'
        break;
      }
      case 'INVALID_PASSWORD' : {
        errorMessage = 'The password is invalid or the user does not have a password.';
        break;
      }
      case 'USER_DISABLED' : {
        errorMessage = 'The user account has been disabled by an administrator.';
        break;
      }
      default : {errorMessage = 'An error occured!'} break;
    } 
    return throwError(() => new Error(errorMessage));
  }
}
