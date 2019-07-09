import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { map } from 'rxjs/operators';
import * as RecipesActions from '../../../store/actions/recipe.action';
import * as ShoppingListActions from '../../../store/actions/shopping-list.action';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.store.select('recipes')
            .pipe(
              map(recipeSate => {
                return recipeSate.recipes.find((recipe, index) => {
                  return index == this.id
                })
              })
            )
            .subscribe(recipe => {
              this.recipe = recipe
            })
        }
      )
  }

  onAddToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients))
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route })
    //this.router.navigate(['../',this.id,'edit'], {relativeTo: this.route})
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id))
    this.router.navigate(['/recipes'])
  }

}
