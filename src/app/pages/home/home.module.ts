import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { SharedModule } from '../../shared/shared.module';
import { ProductComponent } from './components/product/product.component';
import { OrderComponent } from './components/order/order.component';

@NgModule({
  declarations: [HomeComponent, ProductsComponent, ProductComponent, OrderComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
  ],
})
export class HomeModule {}
