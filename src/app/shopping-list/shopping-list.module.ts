import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: ShoppingListComponent }
    ]),
    FormsModule
  ],
  declarations: [    
    ShoppingListComponent, 
    ShoppingEditComponent,
  ]
})
export class ShoppingListModule { }