import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
