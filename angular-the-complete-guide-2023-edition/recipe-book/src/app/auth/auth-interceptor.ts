import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()

export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // console.table(this.authService.user);
       return this.authService.user //user is now behaviorsubject
        .pipe(
            take(1), //take just first object, first / latest user and unsubscribe automaticaly
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