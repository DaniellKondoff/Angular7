import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../../../services/recipe.service';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number
  editMode = false;
  recipe: Recipe

  constructor(private route: ActivatedRoute, private recipeServide: RecipeService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id']
          this.editMode = params['id'] != null
          if (this.editMode) {
            //this.recipe = this.recipeServide.getRecipeById(this.id)
          } else {

          }
        }
      )
  }

}
