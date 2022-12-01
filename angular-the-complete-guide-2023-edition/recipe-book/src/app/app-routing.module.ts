import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ErrorPageComponent } from "./error-page/error-page.component";

const appRoutes: Routes = [
    {
        path: "",
        redirectTo: "/recipes",
        pathMatch: 'full'
    },
    {
        path: 'recipes',
        // loadChildren: './recipes/recipes.module#RecipesModule'//old style
        loadChildren: () => import ('./recipes/recipes.module').then((mod) => mod.RecipesModule)
    },
    {
        path: 'shopping-list',
        loadChildren: () => import ('./shopping-list/shopping-list.module').then((mod) => mod.ShoppingListModule)
    },
    {
        path: 'auth',
        loadChildren: () => import ('./auth/auth.module').then((mod) => mod.AuthModule)
    },
    {
        path: 'not-found', component: ErrorPageComponent,
        data: {message: 'Page not found!'}
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