import { Component } from '@angular/core';
import { NavController, Platform, LoadingController, ToastController } from 'ionic-angular';
import {Usuarios, Usuario} from '../../providers/usuarios/usuarios';
import {UsuarioPedidosPage} from './usuario-pedidos/usuario-pedidos';

@Component({
  templateUrl: 'build/pages/usuarios/usuarios.html',
  providers: [Usuarios],
})
export class UsuariosPage {
  title: string;
  usuarios: Array<Usuario>;

  constructor(private navCtrl: NavController, private usuariosP: Usuarios, private platform: Platform,
    private loading: LoadingController, private toast: ToastController) {
    this.title = "Listado de Usuarios";
  }

  goPedidos(usuario: Usuario) {
    this.navCtrl.push(UsuarioPedidosPage, { 'usuario': usuario });
  }

  ionViewWillEnter() {
    this.platform.ready().then(() => {
      let load = this.loading.create({ content: 'Buscando usuarios...' });
      load.present().then(() => {
        this.usuariosP.getAll().subscribe(usuarios => {
          this.usuarios = usuarios;
        }, err => {
          console.error.bind(err);
        }, () => {
          load.dismiss();
        });
      });
    });
  }

}
