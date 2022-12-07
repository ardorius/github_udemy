import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { exhaustMap, map, take } from "rxjs";
import { AuthService } from "./auth.service";

import * as fromApp from '../store/app.reducer';

@Injectable()

export class AuthInterceptorService implements HttpInterceptor{
    constructor(
        private authService: AuthService,
        private store: Store<fromApp.AppState>){}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // console.table(this.authService.user);
       //return this.authService.user //user is now behaviorsubject
       return this.store.select('auth')
       .pipe(
            take(1), //take just first object, first / latest user and unsubscribe automaticaly
            map(authState => {
                return authState.user;
            }),
            exhaustMap(user => { //use for work with two observables
                // console.table(this.authService.user);
                if(!user){
                    return next.handle(req);//if we do not have user, ext login
                    
                }
                const modifiedReq = req.clone({
                    params: new HttpParams().set('auth', user.token)
                });
                return next.handle(modifiedReq)
            })
        );            
        // .subscribe();
        
    }

}