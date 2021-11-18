import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(`${environment.urlBase}products`);
  }

  getProduct(id: number): Observable<Product> {
    return this._http.get<Product>(`${environment.urlBase}products/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this._http.post<Product>(`${environment.urlBase}products`, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this._http.put<Product>(`${environment.urlBase}products/${id}`, product);
  }

  deleteProduct(id: number) {
    return this._http.delete(`${environment.urlBase}products/${id}`);
  }
}
