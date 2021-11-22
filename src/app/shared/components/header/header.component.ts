import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category } from '../../interfaces/interfaces';
import { CategoriesService } from './../../services/categories.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  categories!: Category[];
  total$!: Observable<number>;

  constructor(
    private categoriesService: CategoriesService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
    this.total$ = this.cartService.cart$.pipe(
      map(products => {
        let count = 0;
        products.map( product => { count += product.stock })
        return count;
      })
    );
  }

}
