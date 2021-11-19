import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../interfaces/interfaces';
import { CategoriesService } from './../../services/categories.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  categories!: Category[];

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
      }
    );
  }

  getOneCategory() {
    console.log("hola mundo");
  }

}
