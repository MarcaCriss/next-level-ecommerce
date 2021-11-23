import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Product } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private products: Product[] = [];
  private cart = new BehaviorSubject<Product[]>([]);

  cart$ = this.cart.asObservable();

  constructor() {}

  addCart(product: Product): void {
    const producto = this.products.find((data) => data === product);
    if (producto !== product) {
      product.stock = 1;
      this.products = [...this.products, product];
      this.cart.next(this.products);
    } else {
      this.incrementQuantityProduct(product);
    }
  }

  resetCart() {
    this.products = [];
    this.cart.next(this.products);
  }

  removeCart(product: Product) {
    const item = this.products.indexOf(product);
    if (item > -1) {
      this.products.splice(item, 1);
    }
    this.cart.next(this.products);
  }

  quantityProductsInCart(): Observable<number> {
    return this.cart$.pipe(map((product) => product.length));
  }

  subtotalProductsInCart(): Observable<number> {
    return this.cart$.pipe(
      map((product) => {
        let subtotal = 0;
        product.map((item) => {
          subtotal += item.price * item.stock;
        });
        return subtotal;
      })
    );
  }

  incrementQuantityProduct(product: Product) {
    const index = this.products.indexOf(product);
    if (index > -1) {
      if (this.products[index].stock >= 1) {
        this.products[index].stock += 1;
      }
      this.cart.next(this.products);
    } else {
      this.addCart(product);
    }
  }

  decrementQuantityProduct(product: Product) {
    const index = this.products.indexOf(product);
    if (index > -1) {
      if (this.products[index].stock > 1) {
        this.products[index].stock -= 1;
      }
    }
    this.cart.next(this.products);
  }
}
