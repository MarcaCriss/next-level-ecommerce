import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';
import { TokenService } from '../../../../core/auth/services/token.service';
import { CartService } from '../../../../shared/services/cart.service';
import { PedidoService } from '../../../../shared/services/pedido.service';
import { User } from '../../../../core/auth/interfaces/interfaces';
import {
  Product,
  PedidoCreate,
} from '../../../../shared/interfaces/interfaces';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ToastService } from '../../../../shared/services/toast.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  cart: Product[] = [];
  user!: User;
  show!: boolean;
  private onDestroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private tokenService: TokenService,
    private cartService: CartService,
    private pedidoService: PedidoService,
    private toast: ToastService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cartService.cart$
    .pipe(
      takeUntil(this.onDestroy$)
    )
    .subscribe((data: any) => {
      this.cart = data;
    });
    this.form = this.fb.group({
      numero: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
    this.getUser();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  pedido() {
    this.pedidoService.createPedido(this.user.id!)
    .pipe(
      takeUntil(this.onDestroy$)
    )
    .subscribe((data: any) => {
      this.cart.map((product) => {
        const pedido: PedidoCreate = {
          pedidoId: data.id,
          price: product.price,
          quantity: product.stock,
          productId: product.id!,
          name: product.name,
        };
        this.pedidoService.addProductPedido(pedido)
        .pipe(
          takeUntil(this.onDestroy$)
        )
        .subscribe((data: any) => {});
      });
      this.userService.updateNumberUser(this.user.id!, this.form.get('numero')?.value)
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe(() => {})
      this.cartService.resetCart();
      this.toast.success('Pedido Realizado Exitosamente', 'success');
      this.router.navigate(['/']);
    });
  }

  getUser() {
    const user = JSON.parse(this.tokenService.getAuthenticate());
    this.userService.getUser(user.id)
    .pipe(
      takeUntil(this.onDestroy$)
    )
    .subscribe((user: User) => {
      this.user = user;
      if (user.numero !== null) {
        this.form.get('numero')?.setValue(user.numero);
        this.show = false;
      } else {
        this.show = true;
      }
    });
  }

  getNumeroValido() {
    return (
      this.form.get('numero')?.errors?.['required'] &&
      this.form.get('numero')?.touched
    );
  }

  getMinNumeroValido() {
    return (
      this.form.get('numero')?.errors?.['minLength'] &&
      this.form.get('numero')?.touched
    );
  }
}
