import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subject, takeUntil } from 'rxjs';

import { ProductsService } from '../../../../../shared/services/products.service';
import {
  Category,
  Photo,
  ResponseAWS,
} from '../../../../../shared/interfaces/interfaces';
import { Product } from '../../../../../shared/interfaces/interfaces';
import { CategoriesService } from './../../../../../shared/services/categories.service';
import { PhotoService } from '../../../../../shared/services/photo.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss'],
})
export class ProductsFormComponent implements OnInit, OnDestroy {
  id: string | null;
  titleForm = 'Crear producto nuevo';
  buttonForm = 'Guardar';
  form!: FormGroup;
  categories$!: Observable<Category[]>;
  photo!: FormGroup;
  edit = false;
  url = environment.urlBase;
  photos: Photo[] = [];
  onDestroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private photoService: PhotoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.isEdit();
    this.getAllCategories();
    this.builderFormOfProduct();
    this.builderFormOfPhoto();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  uploadFile(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.photoService
        .uploadFile(file)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((data: ResponseAWS) => {
          if (this.id !== null) {
            this.photos.push({ name: data.key, url: data.Location });
          } else {
            this.photos = [];
            this.photos.push({ name: data.key, url: data.Location });
          }
          this.photo.get('name')?.setValue(data.key);
          this.photo.get('url')?.setValue(data.Location);
        });
    }
  }

  createProduct() {
    this.productsService
      .createProduct(this.form.value)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((product: Product) => {
        this.photo.get('productId')?.setValue(product.id);
        this.photoService
          .createPhoto(this.photo.value)
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((data) => {
            this.router.navigate(['./admin/products']);
          });
      });
  }

  updateProduct(id: string) {
    this.productsService
      .updateProduct(parseInt(id), this.form.value)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data) => {
        this.photo.get('productId')?.setValue(parseInt(id));
        this.photoService
          .createPhoto(this.photo.value)
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((data) => {
            this.router.navigate(['./admin/products']);
          });
      });
  }

  isEdit() {
    if (this.id !== null) {
      this.edit = true;
      this.titleForm = 'Editar producto';
      this.buttonForm = 'Actualizar';
      this.productsService
        .getProduct(parseInt(this.id))
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((product: Product) => {
          this.photos = product.photos!;
          this.form.setValue({
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            category: product.category.id, 
          });
        });
    }
  }

  saveOrEditProduct() {
    this.id === null ? this.createProduct() : this.updateProduct(this.id);
  }

  cancel() {
    this.router.navigate(['./admin/products']);
  }

  builderFormOfProduct() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [null, [Validators.required]],
      stock: [null, [Validators.required]],
      category: ['', [Validators.required]],
    });
  }

  builderFormOfPhoto() {
    this.photo = this.fb.group({
      name: ['', Validators.required],
      url: ['', Validators.required],
      productId: [null, Validators.required],
    });
  }

  getAllCategories() {
    this.categories$ = this.categoriesService.getAllCategories();
  }

  inputFile() {
    document.getElementById('image')?.click();
  }
}
