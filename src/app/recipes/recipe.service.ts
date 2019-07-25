import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(
      'Bread 1', 
      'Special Bread Type 1', 
      'https://cdn12.picryl.com/photo/2016/12/31/focciaboller-buns-bread-food-drink-81bdfd-1024.jpg',
      [
        new Ingredient('Wheat', 2),
        new Ingredient('Sugar', 3)
      ]),
    new Recipe(
      'Bread 2', 
      'No Special Bread', 
      'https://cdn12.picryl.com/photo/2016/12/31/focciaboller-buns-bread-food-drink-81bdfd-1024.jpg',
      [
        new Ingredient('Wheat', 3),
        new Ingredient('Salt', 1)
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }

}