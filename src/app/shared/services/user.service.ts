import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../../core/auth/interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  getUser(id: number) {
    return this._http.get<User>(`${environment.urlBase}user/${id}`)
  }

  getAllUser(): Observable<User[]> {
    return this._http.get<User[]>(`${environment.urlBase}user`)
  }
}
