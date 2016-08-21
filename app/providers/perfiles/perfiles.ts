import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

export class Perfil {
  idPerfil: string;
  descripcion: string;
  largo: number;
  pxm: number;
  bxp: number;
  idLinea: number;
}

@Injectable()
export class Perfiles {

  constructor(private http: Http) {}

}

