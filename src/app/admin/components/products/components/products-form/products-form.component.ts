import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';


import { ProductsService } from '../../../../../shared/services/products.service';
import { Product, Category } from '../../../../../shared/interfaces/interfaces';
import { CategoriesService } from './../../../../../shared/services/categories.service';
import { PhotoService } from '../../../../../shared/services/photo.service';
import { environment } from '../../../../../../environments/environment.prod';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss'],
})
export class ProductsFormComponent implements OnInit {
  id: string | null;
  titleForm = 'Crear producto nuevo';
  buttonForm = 'Guardar';
  form!: FormGroup;
  categories$!: Observable<Category[]>;
  photo!: FormGroup;
  edit = false;
  url = environment.urlBase;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private photoService: PhotoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.isEdit();
    this.getAllCategories();
    this.formGroupProduct();
    this.photo = this.fb.group({
      name: new FormControl(''),
      productId: new FormControl(null)
    });
  }

  uploadFile(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.photoService.uploadFile(file).subscribe(
        (data: any) => {
          this.photo.get('name')?.setValue(data.filename);
        }
      )
    }
  }

  createProduct() {
    this.productsService
      .createProduct(this.form.value)
      .subscribe((product: Product) => {
        this.photo.get('productId')?.setValue(product.id);
        this.photoService.create(this.photo.value).subscribe(
          (data) => {
            this.router.navigate(['./admin/products']);
          }
        )
      });
  }

  updateProduct(id: string) {}

  isEdit() {
    if (this.id !== null) {
      this.edit = true;
      this.titleForm = 'Editar producto';
      this.buttonForm = 'Actualizar';
      this.productsService
        .getProduct(parseInt(this.id))
        .subscribe((product: Product) => {
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

  formGroupProduct() {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      stock: new FormControl(null, [Validators.required]),
      category: new FormControl('', Validators.required),
    });
  }

  getAllCategories() {
    this.categories$ = this.categoriesService.getAllCategories();
  }
}
