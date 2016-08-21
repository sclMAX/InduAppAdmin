import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {UsuariosPage} from '../usuarios/usuarios';
import {UsuarioPedidosPage} from '../usuarios/usuario-pedidos/usuario-pedidos';

@Component({
  templateUrl: 'build/pages/home/home.html',
})
export class HomePage {
  title: string;
  constructor(public navCtrl: NavController, private platform: Platform) {
    this.title = "INDUMATICS App Administrador";
  }

  goUsuariosList() {
    this.navCtrl.push(UsuariosPage);
  }

}
