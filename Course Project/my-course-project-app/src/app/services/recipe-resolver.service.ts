import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from '../components/recipes/models/recipe.model';
import { DataStorageService } from './data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorageService: DataStorageService, private resipesService: RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.resipesService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipe();
    } else {
      return recipes
    }
  }
}
