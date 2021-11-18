import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FileUploadModule } from '@iplab/ngx-file-upload';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { ProductsFormComponent } from './components/products-form/products-form.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductsFormComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FileUploadModule,
  ]
})
export class ProductsModule { }
