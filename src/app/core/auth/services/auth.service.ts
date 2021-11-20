import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { login, Data, User } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient, private tokenService: TokenService) { }

  login(data: login): Observable<Data> {
    return this._http.post<Data>(`${environment.urlBase}auth/login`, data);
  }

  register(data: User) {
    return this._http.post(`${environment.urlBase}v1/user/create`, data);
  }

  isAuthenticated(): boolean {
    return Boolean(this.tokenService.getToken());
  }

}
