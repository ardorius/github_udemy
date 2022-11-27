import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, take, tap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn:'root'})

export class AuthGuard implements CanActivate{
constructor(private authService: AuthService,
    private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    boolean | 
    UrlTree | 
    Observable<boolean | UrlTree> | 
    Promise<boolean | UrlTree> {
        return this.authService.user.pipe(
            take(1),//take latest user value,.. remove nasted bugs
            map(user => {
                const isAuth = !!user
                if (isAuth){
                    return true;
                }
                return this.router.createUrlTree(['auth']);//tree new functionality for routing throw authguard
                // return !!user;
            }),
            // tap(isAuth => {
            //     if(!isAuth){
            //         this.router.navigate(['/auth']);//when it is not login, redirect to auth
            //     }
            // })
        );
    }
}