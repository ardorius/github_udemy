import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  singUp(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbuofw54uBPRUsc-L2FukNyHWp_G3VX4c',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(errorResponse => {
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
        default : {errorMessage = 'An error occured!'} break;
      } 
      return throwError(() => new Error(errorMessage));
    })
    )
  }
}
