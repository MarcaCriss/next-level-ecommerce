import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this._http.get<Category[]>(`${environment.urlBase}categories`);
  }

  getCategory(id: number): Observable<Category> {
    return this._http.get<Category>(`${environment.urlBase}categories/${id}`);
  }

  createCategory(product: Category): Observable<Category> {
    return this._http.post<Category>(`${environment.urlBase}categories`, product);
  }

  updateCategory(id: number, category: Category): Observable<Category> {
    return this._http.put<Category>(`${environment.urlBase}categories/${id}`, category);
  }

  deleteCategory(id: number) {
    return this._http.delete(`${environment.urlBase}categories/${id}`);
  }
}
