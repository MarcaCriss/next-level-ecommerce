import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryComponent } from './components/category/category.component';


@NgModule({
  declarations: [
    CategoryFormComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
