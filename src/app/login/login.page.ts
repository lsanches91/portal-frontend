import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = "";
  senha: string = "";

  constructor(private toastController: ToastController, private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  async presentToast(mensagem:string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1500,
      position: 'top',
    });

    await toast.present();
  }

  async logar(){
    if(this.email == "" || this.senha == ""){
      this.presentToast("Insira as crecênciais de acesso");
    }
    else {
      var result = await this.usuarioService.login(this.email, this.senha);

      if(result){
        this.presentToast("Login realizado com sucesso");
      }else{
        this.presentToast("Credênciais de acesso inválidas");
      }
    }
  }

}
