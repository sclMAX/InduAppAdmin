import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import * as ResponseClass from '../clases/response';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

let apiUrl: string = 'http://www.indumatics.com.ar/api/colores/';

export class Color {
  id: number;
  color: string;
  incremento: number;
}

@Injectable()
export class Colores {
  private colores: Array<Color>;
  constructor(private http: Http) { }

  private serverGetAll(): Observable<ResponseClass.Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url: string = apiUrl + '?apikey=30708166614';
    return this.http.get(url, options).map(res => res.json());
  }

  private findColor(id: number): Color {
    this.colores.forEach(color => {
      if (color.id === id) {
        return color;
      }
    });
    return null;
  }

  public getOne(id: number): Color {
    let color: Color = new Color();
    color.id = id;
    color.color = 'No Definido';
    if (this.colores) {
      color = this.findColor(id);
      return color;
    } else {
      this.serverGetAll().subscribe(res => {
        if (res.response) {
          this.colores = <Array<Color>>JSON.parse(JSON.stringify(res.result));
          color = this.findColor(id);
        }
        return color;
      }, err => {
        return color;
      });
    }
  }

  public getAll(): Observable<Array<Color>> {
    if (this.colores) {
      return Observable.create(obs => {
        obs.next(this.colores);
        obs.complete();
      });
    } else {
      return Observable.create(obs => {
        this.serverGetAll().subscribe(res => {
          if (res.response) {
            this.colores = <Array<Color>>JSON.parse(JSON.stringify(res.result));
            obs.next(this.colores);
            obs.complete();
          } else {
            obs.error(res);
          }
        })
      });
    }
  }


}

