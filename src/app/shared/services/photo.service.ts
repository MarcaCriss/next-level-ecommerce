import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Photo } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private _http: HttpClient) { }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append("image", file);
    return this._http.post(`${environment.urlBase}photo/upload`, formData);
  }

  create(data: Photo) {
    return this._http.post(`${environment.urlBase}photo/create`, data);
  }

  getProductsOfPhoto(productId: number): Observable<Photo[]> {
    return this._http.get<Photo[]>(`${environment.urlBase}photo/${productId}/products`);
  }

  delete(photoId: number) {
    return this._http.delete(`${environment.urlBase}photo/${photoId}`);
  }
}
