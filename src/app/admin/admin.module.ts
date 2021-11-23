import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CookieService } from 'ngx-cookie-service';
import { PedidosComponent } from './components/pedidos/pedidos.component';

@NgModule({
  declarations: [NavComponent, DashboardComponent, SidebarComponent, PedidosComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  providers: [CookieService]
})
export class AdminModule { }
