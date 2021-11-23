import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { Photo } from '../../../../../shared/interfaces/interfaces';
import { Product } from "../../../../../shared/interfaces/interfaces";
import { ProductsService } from '../../../../../shared/services/products.service';
import { PhotoService } from '../../../../../shared/services/photo.service';
import { environment } from '../../../../../../environments/environment.prod';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, AfterViewInit {
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

  getAllProducts() {
    this.productsService
      .getAllProducts()
      .subscribe((products: Product[]) => (this.dataSource.data = products));
  }

  editProduct(id: number) {
    this.router.navigate(['./admin/products/edit/', id]);
  }

  deleteProduct(id: number) {
    this.photoService.getProductsOfPhoto(id).subscribe((data: Photo[]) => {
      if (data.length > 0) {
        data.map((photo) => {
          if (photo.id) {
            this.photoService.delete(photo.id);
          }
        });
      }
      this.productsService.deleteProduct(id).subscribe((data) => {
        this.getAllProducts();
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
