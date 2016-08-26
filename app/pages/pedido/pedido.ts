import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Pedido} from '../../providers/pedidos/pedidos';

@Component({
  templateUrl: 'build/pages/pedido/pedido.html',
})
export class PedidoPage {
  pedido: Pedido;
  title: string;
  constructor(private navCtrl: NavController, private parametros: NavParams) {
    this.pedido = this.parametros.get('pedido');
    if (this.pedido.isPedido) {
      this.title = 'Pedido Nro: 0000' + this.pedido.id + ' de Fecha: ' + this.pedido.fecha;
    } else {
      this.title = 'Presupuesto Nro: 0000' + this.pedido.id + ' de Fecha: ' + this.pedido.fecha;
    }
  }

}
