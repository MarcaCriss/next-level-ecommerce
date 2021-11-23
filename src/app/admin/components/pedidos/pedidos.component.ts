import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../../shared/services/pedido.service';
import { UserService } from '../../../shared/services/user.service';
import { Pedido } from '../../../shared/interfaces/interfaces';
import { User } from '../../../core/auth/interfaces/interfaces';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit {
  pedidoByUser: Pedido[][] = [];
  users: User[] = [];

  constructor(private pedidoService: PedidoService, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUser().subscribe(
      (data) => {
        data.map((user) => {
          this.pedidoService.getAllPedidosByUser(user.id!).subscribe(
            (data: Pedido[]) => {
              this.pedidoByUser.push(data);
            }
          )
        })
      }
    )
  }
}
