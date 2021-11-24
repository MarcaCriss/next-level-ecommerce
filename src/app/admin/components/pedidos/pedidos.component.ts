import { Component, OnInit, OnDestroy } from '@angular/core';
import { PedidoService } from '../../../shared/services/pedido.service';
import { UserService } from '../../../shared/services/user.service';
import { Pedido } from '../../../shared/interfaces/interfaces';
import { User } from '../../../core/auth/interfaces/interfaces';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit, OnDestroy {
  pedidoByUser: Pedido[][] = [];
  users: User[] = [];
  onDestroy$ = new Subject<void>();

  constructor(private pedidoService: PedidoService, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUser()
    .pipe(
      takeUntil(this.onDestroy$)
    )
    .subscribe(
      (data) => {
        data.map((user) => {
          this.pedidoService.getAllPedidosByUser(user.id!)
          .pipe(
            takeUntil(this.onDestroy$)
          )
          .subscribe(
            (data: Pedido[]) => {
              this.pedidoByUser.push(data);
            }
          )
        })
      }
    )
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
