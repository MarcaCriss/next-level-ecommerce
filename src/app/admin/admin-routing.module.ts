import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./components/products/products.module').then(
            (m) => m.ProductsModule
          ),
      },
      {
        path: 'categories',
        loadChildren: () => import('./components/categories/categories.module').then(
          (m) => m.CategoriesModule
        )
      },
      {
        path: 'pedidos',
        component: PedidosComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
