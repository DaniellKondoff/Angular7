import { NgModule } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { ShoppingListService } from '../services/shopping-list.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../auth/auth/auth-interceptor.service';

@NgModule({
    providers: [
        RecipeService,
        ShoppingListService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
    ]
})
export class CoreModule { }