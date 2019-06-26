import { NgModule } from '@angular/core';
import { RecipesComponent } from '../components/recipes/recipes.component';
import { RecipesListComponent } from '../components/recipes/recipes-list/recipes-list.component';
import { RecipesDetailComponent } from '../components/recipes/recipes-detail/recipes-detail.component';
import { RecipesItemComponent } from '../components/recipes/recipes-list/recipes-item/recipes-item.component';
import { RecipeStartComponent } from '../components/recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from '../components/recipes/recipe-edit/recipe-edit.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from './shared.module';

@NgModule({
    declarations:[
        RecipesComponent,
        RecipesListComponent,
        RecipesDetailComponent,
        RecipesItemComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ],
    imports: [
        RouterModule,
        SharedModule,
        ReactiveFormsModule,
        RecipesRoutingModule
    ]
})
export class RecipesModule{}