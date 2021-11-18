import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';

const routes: Routes = [
  {
    path:'',
    component: CategoryComponent
  },
  {
    path: 'create',
    component: CategoryFormComponent
  },
  {
    path: 'edit/:id',
    component: CategoryFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
