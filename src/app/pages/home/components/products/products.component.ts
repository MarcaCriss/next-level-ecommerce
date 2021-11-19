import { AfterViewInit, Component, OnInit } from '@angular/core';

import { ProductsService } from '../../../../shared/services/products.service';
import { environment } from '../../../../../environments/environment.prod';
import { Product } from '../../../../shared/interfaces/interfaces';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products!: Product[];
  url = environment.urlBase;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

}
