import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = "";
  senha: string = "";

  constructor(private toastController: ToastController, private usuarioService: UsuarioService, private authentication: AuthenticationService) { }

  ngOnInit() {
    this.verificaLoginExistente();
  }

  async presentToast(mensagem:string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1500,
      position: 'top',
    });

    await toast.present();
  }

  async verificaLoginExistente() {
      var user = await this.usuarioService.getUsuarioLogado();
      if (user) {
        window.location.href = "/perfil";
      }
  }

  async logar() {
    const usuario = {
      email: this.email,
      senha: this.senha,
    };

    const retorno = await this.authentication.login(usuario);

    if (retorno) {
      this.presentToast('Entrando...');
      const user = await this.usuarioService.getUsuario();
      await this.usuarioService.setUsuarioLogado(user);
      window.location.href = "/perfil";
    }
  }

}
