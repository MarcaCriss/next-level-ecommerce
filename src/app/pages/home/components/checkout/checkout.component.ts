import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';
import { TokenService } from '../../../../core/auth/services/token.service';
import { CartService } from '../../../../shared/services/cart.service';
import { PedidoService } from '../../../../shared/services/pedido.service';
import { User } from '../../../../core/auth/interfaces/interfaces';
import { Product, PedidoCreate } from '../../../../shared/interfaces/interfaces';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  form!: FormGroup;
  cart: Product[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private tokenService: TokenService,
    private cartService: CartService,
    private pedidoService: PedidoService,
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(
      (data) => {
        this.cart = data;
      }
    )
    this.form = this.fb.group({
      numero: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  pedido() {
    const user = JSON.parse(this.tokenService.getAuthenticate());
    this.userService.getUser(user.id).subscribe(
      (data: User) => {
        this.pedidoService.createPedido(data.id!).subscribe(
          (data) => {
            this.cart.map(
              (product) => {
                const pedido: PedidoCreate = {
                  pedidoId: data.id,
                  price: product.price,
                  quantity: product.stock,
                  productId: product.id!,
                  name: product.name
                }
                this.pedidoService.addProductPedido(pedido);
              }
            );
            this.cartService.resetCart();
          }
        )
      }
    );
  }

  getNumeroValido() {
    return this.form.get('numero')?.errors?.['required'] && this.form.get('numero')?.touched;
  }

  getMinNumeroValido() {
    return (
      this.form.get('numero')?.errors?.['minLength'] &&
      this.form.get('numero')?.touched
    );
  }
}
