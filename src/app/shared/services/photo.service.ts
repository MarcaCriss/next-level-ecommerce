import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Photo, ResponseAWS } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private _http: HttpClient) { }

  uploadFile(file: File): Observable<ResponseAWS> {
    const formData = new FormData();
    formData.append("image", file);
    return this._http.post<ResponseAWS>(`${environment.urlBase}photo/upload`, formData);
  }

  createPhoto(product: Photo): Observable<Photo> {
    return this._http.post<Photo>(`${environment.urlBase}photo/create`, product);
  }

  delete(filename: string) {
    return this._http.delete(`${environment.urlBase}photo/${filename}`);
  }
}
