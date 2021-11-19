import { AfterViewInit, Component, OnInit } from '@angular/core';

import { ProductsService } from '../../../../shared/services/products.service';
import { environment } from '../../../../../environments/environment.prod';
import { Product, Category } from '../../../../shared/interfaces/interfaces';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CategoriesService } from '../../../../shared/services/categories.service';

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

  getProductsByCategory() {
    if ( this.id === null) {
      this.getAllProducts();
    } else {
      this.categoriesService.getCategory(parseInt(this.id)).subscribe(
        (data: Category) => {
          console.log(data);
          if (data.products) {
            this.products = data.products;
          }
        }
      )
    }
  }
}
