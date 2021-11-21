import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../../shared/services/products.service';
import { Product } from '../../../../shared/interfaces/interfaces';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { CartService } from '../../../../shared/services/cart.service';

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
    private cartService: CartService
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.product$ = this.productsService.getProduct(parseInt(this.id))
  }

  addCart(product: Product) {
    this.cartService.addCart(product);
  }

  quantity(evt: any) {
    console.log(evt);
  }

}
