import { Component } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import {Pedidos, Pedido} from '../../../providers/pedidos/pedidos';
import {Usuario} from '../../../providers/usuarios/usuarios';
import {Color} from '../../../providers/colores/colores';


@Component({
  templateUrl: 'build/pages/usuarios/usuario-pedidos/usuario-pedidos.html',
  providers: [Pedidos],
})
export class UsuarioPedidosPage {
  pedidos: Array<Pedido>;
  usuario: Usuario;

  constructor(private navCtrl: NavController, private parametros: NavParams, private pedidosP: Pedidos,
    private platform: Platform, private loading: LoadingController) {
    this.usuario = this.parametros.get('usuario');
  }

  ionViewWillEnter() {
    this.platform.ready().then(() => {
      let load = this.loading.create({ content: 'Buscando usuarios...' });
      load.present().then(() => {
        this.pedidosP.getPorUsuario(this.usuario.id).subscribe(pedidos => {
          this.pedidos = pedidos;
        }, err => {
          console.error.bind(err);
          load.dismiss();
        }, () => {
          load.dismiss();
        });
      });
    });
  }
}
