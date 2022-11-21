import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { NoRecipeComponent } from "./recipes/no-recipe/no-recipe.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipesResolverService } from "./recipes/recipes-resolver.service";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
    {
        path: "",
        redirectTo: "/recipes",
        pathMatch: 'full'
    },
    {
        path: 'recipes',
        component: RecipesComponent,
        children: [
            {path: '', component: NoRecipeComponent },
            {path: 'new', component: RecipeEditComponent},
            {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
            {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]}
        ]
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