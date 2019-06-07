import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../models/recipe.model'
import { RecipeService } from 'src/app/services/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipes: Array<Recipe> = [];
  recipeSubs: Subscription
  
  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
   this.recipeSubs = this.recipeService.newRecipeEvent.subscribe(() => {
      this.recipes = this.recipeService.getRecipes();
    })

    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(){
    this.recipeSubs.unsubscribe();
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route})
  }
}
