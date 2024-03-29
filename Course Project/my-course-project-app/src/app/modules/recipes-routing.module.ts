import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from '../components/recipes/recipes.component';
import { AuthGuard } from '../auth/auth/auth.guard';
import { RecipeStartComponent } from '../components/recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from '../components/recipes/recipe-edit/recipe-edit.component';
import { RecipesDetailComponent } from '../components/recipes/recipes-detail/recipes-detail.component';
import { RecipeResolverService } from '../services/recipe-resolver.service';

const routes: Routes = [
    {
        path: '', component: RecipesComponent, canActivate: [AuthGuard], children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipesDetailComponent, resolve: [RecipeResolverService] },
            { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService] }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {

}