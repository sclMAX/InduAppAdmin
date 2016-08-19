import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import * as ResponseClass from '../clases/response';
import {Observable} from 'rxjs';

let apiUrl: string = 'http://www.indumatics.com.ar/api/pedidos/';

export class PedidoServer {
  id: number;
  idUsuario: number;
  isPedido: boolean;
  fecha: Date;
  comentarios: string;
  isEnviado: boolean;
  isProcesado: boolean;
  detalle: Array<ItemServer>;
  constructor() {
    this.detalle = new Array<ItemServer>();
  }
}

export class ItemServer {
  id: number;
  idPedido: number;
  cantidad: number;
  idPerfil: string;
  idColor: number;
  comentario: string;
}

@Injectable()
export class Pedidos {
  constructor(private http: Http) { }

  private serverUsuarioGetPedidos(idUsuario: number): Observable<ResponseClass.Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url: string = apiUrl + '?idUsuario=' + idUsuario + '&apikey=30708166614';
    return this.http.get(url, options).map(res => res.json());
  }

  public getPorUsuario(idUsuario: number): Observable<Array<PedidoServer>> {
    return Observable.create(obs => {
      this.serverUsuarioGetPedidos(idUsuario).subscribe(res => {
        if (res.response) {
          let pedidos = <Array<PedidoServer>>JSON.parse(JSON.stringify(res.result));
          obs.next(pedidos);
          obs.complete();
        } else {
          obs.error(res);
        }
      })
    });
  }

}

