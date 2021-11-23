import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private cookieService: CookieService) { }

  saveToken(token: string) {
    this.cookieService.set('token', token);
  }

  getToken() {
    return this.cookieService.get('token');
  }

  removeToken() {
    this.cookieService.delete('token');
  }

  checkToken() {
    return this.cookieService.check('token');
  }

  setAuthenticate(id: number) {
    this.cookieService.set('authenticate', JSON.stringify({
      authenticated: true,
      id: id
    }));
  }

  getAuthenticate() {
    return this.cookieService.get('authenticate');
  }

  removeAuthenticate() {
    this.cookieService.delete('authenticate');
  }
}
