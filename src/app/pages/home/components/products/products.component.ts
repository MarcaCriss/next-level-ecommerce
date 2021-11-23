import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../../../shared/services/products.service';
import { environment } from '../../../../../environments/environment.prod';
import { Category } from '../../../../shared/interfaces/interfaces';
import { Product } from '../../../../shared/interfaces/interfaces';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CategoriesService } from '../../../../shared/services/categories.service';
import { CartService } from '../../../../shared/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  url = environment.urlBase;
  id!: string | null;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService
  ) {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.getProductsByCategory();
    });
  }

  ngOnInit(): void {
    this.getProductsByCategory();
  }

  getAllProducts() {
    this.productsService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  addCart(product: Product) {
    this.cartService.addCart(product);
  }

  getProductsByCategory() {
    if (this.id === null) {
      this.getAllProducts();
    } else {
      this.categoriesService
        .getCategory(parseInt(this.id))
        .subscribe((data: Category) => {
          if (data.products) {
            this.products = data.products;
          }
        });
    }
  }
}
