import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../models/recipe.model'
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipes: Array<Recipe> = [];
  recipeSubs: Subscription

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit() {
    this.recipeSubs = this.store
      .select('recipes')
      .pipe(map(recipesState => recipesState.recipes))
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes
      })
  }

  ngOnDestroy() {
    this.recipeSubs.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }
}
