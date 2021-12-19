import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../../shared/services/products.service';
import { Product } from '../../../../shared/interfaces/interfaces';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { CartService } from '../../../../shared/services/cart.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  id: string;
  product$!: Observable<Product>;
  url = environment.urlBase;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService,
    private toast: ToastService
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.product$ = this.productsService.getProduct(parseInt(this.id)).pipe(
      map((product: Product) => {
        product.stock = 1;
        return product;
      })
    );
  }

  addCart(product: Product) {
    this.cartService.addCart(product);
    this.toast.success('Producto añadido al carrito')
  }

  increment(product: Product) {
    this.cartService.incrementQuantityProduct(product);
    this.toast.success('Producto añadido al carrito')
  }

  decrement(product: Product) {
    this.cartService.decrementQuantityProduct(product);
  }

}
