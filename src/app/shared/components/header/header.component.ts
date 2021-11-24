import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { Category } from '../../interfaces/interfaces';
import { CategoriesService } from './../../services/categories.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  categories!: Category[];
  total$!: Observable<number>;
  onDestroy$ = new Subject<void>();

  constructor(
    private categoriesService: CategoriesService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.categoriesService.getAllCategories()
    .pipe(
      takeUntil(this.onDestroy$)
    )
    .subscribe((data) => {
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

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
