import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import * as ResponseClass from '../clases/response';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

let PouchDB = require('pouchdb');
let apiUrl: string = 'http://www.indumatics.com.ar/api/usuarios/';

export class Usuario {
  id: number = 0;
  razonSocial: string;
  nombre: string;
  telefono: string;
  email: string;
  direccion: string;
  localidad: string = 'Paraná';
  provincia: string = 'Entre Ríos';
  pais: string = 'Argentina';
}

@Injectable()
export class Usuarios {
  private usuarios: Array<Usuario>;

  constructor(private http: Http) { }

  private serverGetAll(): Observable<ResponseClass.Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url: string = apiUrl + '?apikey=30708166614';
    return this.http.get(url, options).map(res => res.json());
  }

  public getAll(): Observable<Array<Usuario>> {
    return Observable.create(obs => {
      this.serverGetAll().subscribe(res => {
        if (res.response) {
          this.usuarios = <Array<Usuario>>JSON.parse(JSON.stringify(res.result));
          obs.next(this.usuarios);
          obs.complete();
        } else {
          obs.error(res);
        }
      }, err => {
        obs.next(err);
      })
    });
  }
}

