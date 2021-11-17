import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ProductsFormComponent } from './components/products-form/products-form.component';

const routes: Routes = [
  {
    path:'',
    component: ProductsComponent
  },
  {
    path: 'create',
    component: ProductsFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
