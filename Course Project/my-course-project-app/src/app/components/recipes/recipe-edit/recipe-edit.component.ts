import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../models/recipe.model';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { map } from 'rxjs/operators';
import * as RecipesActions from '../../recipes/../../store/actions/recipe.action'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number
  editMode = false;
  recipe: Recipe
  recipeForm: FormGroup;
  private storeSub: Subscription

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id']
          this.editMode = params['id'] != null
          this.initForm();
        }
    )
  }

  onSubmit(){
    let newRecipe: Recipe;
    const recipeFormValue = this.recipeForm.value
    newRecipe = new Recipe(this.id, recipeFormValue.name,recipeFormValue.description, recipeFormValue.imagePath, recipeFormValue.ingredients)

    if(this.editMode){  
      this.store.dispatch(new RecipesActions.UpdateRecipe({index: this.id, newRecipe: newRecipe}))
    }else{
     this.store.dispatch(new RecipesActions.AddRecipe(newRecipe))
    }

    this.router.navigate(['recipes'])
  }

  private initForm(){  
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
    this.storeSub =  this.store.select('recipes')
        .pipe(
          map(recipesState => {
            return recipesState.recipes.find((recipe, index) => {
              return index == this.id
            })
          })
        )
        .subscribe(recipe =>{
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
    
          if(recipe['ingredients']){
            for(let ingredient of recipe.ingredients){
              recipeIngredients.push(
                new FormGroup({
                  'name': new FormControl(ingredient.name, Validators.required),
                  'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
                })
              )
            }
          }
        })
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  getControls(){
    return(<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onDeleteIngredient(index: number){
   (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

  ngOnDestroy(){
    if(this.editMode){
      this.storeSub.unsubscribe();
    }
  }
}
