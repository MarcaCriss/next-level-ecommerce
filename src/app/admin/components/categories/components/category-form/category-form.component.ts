import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoriesService } from './../../../../../shared/services/categories.service';
import { Category } from '../../../../../shared/interfaces/interfaces';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit, OnDestroy {
  id: string | null;
  titleForm = 'Crear categoria nueva';
  buttonForm = 'Guardar';
  form!: FormGroup;
  onDestroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.isEdit();
    this.formGroupCategory();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  createCategory() {
    this.categoriesService
      .createCategory(this.form.value)
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe((category: Category) => {
        this.router.navigate(['./admin/categories']);
      });
  }

  updateCategory(id: string) {
    this.categoriesService
      .updateCategory(parseInt(id), this.form.value)
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe((data) => {
        this.router.navigate(['./admin/categories']);
      });
  }

  isEdit() {
    if (this.id !== null) {
      this.titleForm = 'Editar categoria';
      this.buttonForm = 'Actualizar';
      this.categoriesService
        .getCategory(parseInt(this.id))
        .pipe(
          takeUntil(this.onDestroy$)
        )
        .subscribe((category: Category) => {
          this.form.setValue({
            name: category.name,
          });
        });
    }
  }

  saveOrEditCategory() {
    this.id === null ? this.createCategory() : this.updateCategory(this.id);
  }

  cancel() {
    this.router.navigate(['./admin/categories']);
  }

  formGroupCategory() {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
    });
  }
}
