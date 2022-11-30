import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
    {
        path: "",
        redirectTo: "/recipes",
        pathMatch: 'full'
    },
    {
        path: 'shopping-list',
        component: ShoppingListComponent
    },
    {
        path: 'not-found', component: ErrorPageComponent,
        data: {message: 'Page not found!'}
    },
    {
        path: 'auth',
        component: AuthComponent
    },
    {
        path: '**', redirectTo: 'not-found'
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule{

}