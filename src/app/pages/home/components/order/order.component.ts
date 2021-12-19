import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../../../../shared/services/cart.service';
import { Product } from '../../../../shared/interfaces/interfaces';
import { environment } from './../../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutComponent } from '../checkout/checkout.component';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  cart$!: Observable<Product[]>;
  quantityProductsInCart$!: Observable<number>;
  subtotalProductsInCart$!: Observable<number>;
  url = environment.urlBase;

  constructor(
    private cartService: CartService,
    public dialog: MatDialog,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.cart$ = this.cartService.cart$;
    this.quantityProductsInCart$ = this.cartService.quantityProductsInCart();
    this.subtotalProductsInCart$ = this.cartService.subtotalProductsInCart();
  }

  removeCart(product: Product) {
    this.cartService.removeCart(product);
    this.toast.success('Producto eliminado del carrito', 'danger')
  }

  increment(product: Product) {
    this.cartService.incrementQuantityProduct(product);
    this.toast.success('Producto añadido al carrito');
  }

  decrement(product: Product) {
    this.cartService.decrementQuantityProduct(product);
  }

  openDialog() {
    this.dialog.open(CheckoutComponent);
  }
}
