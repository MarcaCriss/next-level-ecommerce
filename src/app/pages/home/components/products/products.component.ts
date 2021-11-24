import { Component, OnInit, OnDestroy } from '@angular/core';

import { ProductsService } from '../../../../shared/services/products.service';
import { environment } from '../../../../../environments/environment.prod';
import { Category } from '../../../../shared/interfaces/interfaces';
import { Product } from '../../../../shared/interfaces/interfaces';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CategoriesService } from '../../../../shared/services/categories.service';
import { CartService } from '../../../../shared/services/cart.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  url = environment.urlBase;
  id!: string | null;
  onDestroy$ = new Subject<void>();

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private toast: ToastService
  ) {
    this.activatedRoute.paramMap
    .pipe(
      takeUntil(this.onDestroy$)
    )
    .subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.getProductsByCategory();
    });
  }

  ngOnInit(): void {
    this.getProductsByCategory();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  getAllProducts() {
    this.productsService.getAllProducts()
    .pipe(
      takeUntil(this.onDestroy$)
    )
    .subscribe((data: any) => {
      this.products = data;
    });
  }

  addCart(product: Product) {
    this.cartService.addCart(product);
    this.toast.success('Producto añadido al carrito');
  }

  getProductsByCategory() {
    if (this.id === null) {
      this.getAllProducts();
    } else {
      this.categoriesService
        .getCategory(parseInt(this.id))
        .pipe(
          takeUntil(this.onDestroy$)
        )
        .subscribe((data: Category) => {
          if (data.products) {
            this.products = data.products;
          }
        });
    }
  }
}
