import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductsService } from '../../../../../shared/services/products.service';
import { Product } from '../../../../../shared/interfaces/product.interface';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl(0, [Validators.required]),
      stock: new FormControl(0, [Validators.required]),
    });
    this.isEdit();
  }

  createProduct() {
    this.productsService
      .createProduct(this.form.value)
      .subscribe((product: Product) => {
        console.log('producto creado');
      });
  }

  updateProduct(id: string) {}

  isEdit() {
    if (this.id !== null) {
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
}
