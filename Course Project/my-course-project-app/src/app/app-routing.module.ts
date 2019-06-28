import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'

const appRoutes: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch: 'full'},
    {path: 'recipes', loadChildren: './modules/recipes.module#RecipesModule'},
    {path: 'shopping-list', loadChildren: './modules/shopping-list.module#ShoppingListModule'},
    {path: 'auth', loadChildren: './modules/auth.module#AuthModule'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}