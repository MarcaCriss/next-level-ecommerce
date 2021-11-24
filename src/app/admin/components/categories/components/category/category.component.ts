import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../../../../../shared/interfaces/interfaces';
import { CategoriesService } from './../../../../../shared/services/categories.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'acciones'];
  dataSource = new MatTableDataSource<Category>();
  private onDestroy$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  getAllCategories() {
    this.categoriesService.getAllCategories()
    .pipe(
      takeUntil(this.onDestroy$)
    )
    .subscribe(
      (data: Category[]) => this.dataSource.data = data
    )
  }

  editCategories(id: number) {
    this.router.navigate(['./admin/categories/edit/', id]);
  }

  deleteCategories(id: number) {
    this.categoriesService.deleteCategory(id)
    .pipe(
      takeUntil(this.onDestroy$)
    )
    .subscribe(
      (data) => {
        this.getAllCategories()
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
