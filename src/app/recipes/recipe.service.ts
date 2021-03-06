import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Bread 1', 
  //     'Special Bread Type 1', 
  //     'https://cdn12.picryl.com/photo/2016/12/31/focciaboller-buns-bread-food-drink-81bdfd-1024.jpg',
  //     [
  //       new Ingredient('Wheat', 2),
  //       new Ingredient('Sugar', 3)
  //     ]),
  //   new Recipe(
  //     'Bread 2', 
  //     'No Special Bread', 
  //     'https://cdn12.picryl.com/photo/2016/12/31/focciaboller-buns-bread-food-drink-81bdfd-1024.jpg',
  //     [
  //       new Ingredient('Wheat', 3),
  //       new Ingredient('Salt', 1)
  //     ])
  // ];
  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}