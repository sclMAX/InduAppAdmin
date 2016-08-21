import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import * as ResponseClass from '../clases/response';
import {Observable} from 'rxjs';
import {Usuario} from '../usuarios/usuarios';
import {Color} from '../colores/colores';
import {Perfil} from '../perfiles/perfiles';

let apiUrl: string = 'http://www.indumatics.com.ar/api/pedidos/';

export class Pedido {
  id: number;
  usuario: Usuario;
  isPedido: boolean = false;
  fecha: Date;
  comentarios: string;
  isEnviado: boolean = false;
  isProcesado: boolean = false;
  detalle: Array<Item>;
  constructor() {
    this.detalle = new Array<Item>();
  }
}

export class Item {
  id: number;
  idPedido: number;
  cantidad: number;
  perfil: Perfil;
  color: Color;
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

  public getPorUsuario(idUsuario: number): Observable<Array<Pedido>> {
    return Observable.create(obs => {
      this.serverUsuarioGetPedidos(idUsuario).subscribe(res => {
        if (res.response) {
          let pedidos = <Array<Pedido>>JSON.parse(JSON.stringify(res.result));
          obs.next(pedidos);
          obs.complete();
        } else {
          obs.error(res);
        }
      })
    });
  }

}

