import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { Photo } from '../../../../../shared/interfaces/interfaces';
import { Product } from "../../../../../shared/interfaces/interfaces";
import { ProductsService } from '../../../../../shared/services/products.service';
import { PhotoService } from '../../../../../shared/services/photo.service';
import { environment } from '../../../../../../environments/environment.prod';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'id',
    'name',
    'price',
    'stock',
    'category',
    'image',
    'acciones',
  ];
  dataSource = new MatTableDataSource<Product>();
  url = environment.urlBase;
  onDestroy$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private photoService: PhotoService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  getAllProducts() {
    this.productsService
      .getAllProducts()
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe((products: Product[]) => (this.dataSource.data = products));
  }

  editProduct(id: number) {
    this.router.navigate(['./admin/products/edit/', id]);
  }

  deleteProduct(id: number) {
    // this.photoService.getProductsOfPhoto(id)
    // .pipe(
    //   takeUntil(this.onDestroy$)
    // )
    // .subscribe((data: Photo[]) => {
    //   if (data.length > 0) {
    //     data.map((photo) => {
    //       if (photo.id) {
    //         this.photoService.delete(photo.id);
    //       }
    //     });
    //   }
    //   this.productsService.deleteProduct(id)
    //   .pipe(
    //     takeUntil(this.onDestroy$)
    //   )
    //   .subscribe((data) => {
    //     this.getAllProducts();
    //   });
    // });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
