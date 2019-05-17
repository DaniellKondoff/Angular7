import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {
  @Input() recipe: Recipe
  @Output() newRecipeEvent = new EventEmitter<void>()

  constructor() { }

  ngOnInit() {
  }

  onClickRecipe(){
    this.newRecipeEvent.emit();
  }

}
