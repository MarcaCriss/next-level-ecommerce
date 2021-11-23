import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PedidoCreate, Pedido } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private _http: HttpClient) { }

  getAllPedidos(): Observable<Pedido[]> {
    return this._http.get<Pedido[]>(`${environment.urlBase}pedidos`);
  }

  getAllPedidosByUser(id: number): Observable<Pedido[]> {
    return this._http.get<Pedido[]>(`${environment.urlBase}pedidos/${id}/user`);
  }

  getPedido(id: number): Observable<PedidoCreate> {
    return this._http.get<PedidoCreate>(`${environment.urlBase}pedidos/${id}`);
  }

  createPedido(id: number): Observable<any> {
    return this._http.post<any>(`${environment.urlBase}pedidos`, {user: id});
  }

  addProductPedido(pedido: PedidoCreate) {
    return this._http.post<PedidoCreate>(`${environment.urlBase}pedido-product`, pedido);
  }
}
