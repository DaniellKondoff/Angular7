import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {
  @Input() recipe: Recipe

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  onClickRecipe(){
    this.recipeService.recipeSelected.emit(this.recipe)
  }
}
