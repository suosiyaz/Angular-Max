import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
   recipes: Recipe[] = [
    new Recipe('Test1', 'For Testing', 'https://cdn12.picryl.com/photo/2016/12/31/focciaboller-buns-bread-food-drink-81bdfd-1024.jpg'),
    new Recipe('Test2', 'For Testing', 'https://cdn12.picryl.com/photo/2016/12/31/focciaboller-buns-bread-food-drink-81bdfd-1024.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}