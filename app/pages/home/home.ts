import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {UsuariosPage} from '../usuarios/usuarios';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  title: string;
  constructor(public navCtrl: NavController) {
    this.title = "INDUMATICS App Administrador";
  }

  goUsuariosList(){
    this.navCtrl.push(UsuariosPage);
  }  


}
