import {Component} from '@angular/core';
import {NavController, Platform, LoadingController} from 'ionic-angular';
import {UsuariosPage} from '../usuarios/usuarios';
import {UsuarioPedidosPage} from '../usuarios/usuario-pedidos/usuario-pedidos';
import {Pedidos, Pedido} from '../../providers/pedidos/pedidos';
import {PedidoPage} from '../pedido/pedido';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [Pedidos],
})
export class HomePage {
  title: string;
  pedidosNuevos: Array<Pedido>;
  constructor(public navCtrl: NavController, private platform: Platform, private loading: LoadingController,
    private pedidosP: Pedidos) {
    this.title = "INDUMATICS App Administrador";
  }

  goUsuariosList() {
    this.navCtrl.push(UsuariosPage);
  }

  goPedido(pedido: Pedido) {
    this.navCtrl.push(PedidoPage, { 'pedido': pedido });
  }

  updatePedidosList() {
    let load = this.loading.create({ content: 'Buscando Nuevos Pedidos...' });
    load.present().then(() => {
      this.pedidosP.getAllProcesados(false).subscribe(pedidos => {
        this.pedidosNuevos = pedidos;
      }, err => {
        load.dismiss();
        console.error.bind(err);
      }, () => {
        load.dismiss();
      })
    });
  }


  ionViewWillEnter() {
    this.platform.ready().then(() => {
      this.updatePedidosList();
    });
  }

}
