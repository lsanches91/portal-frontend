import { UtilsService } from '../services/utilidades.service';
import { UsuarioService } from '../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-esqueceu-senha',
  templateUrl: './esqueceu-senha.page.html',
  styleUrls: ['./esqueceu-senha.page.scss'],
})
export class EsqueceuSenhaPage implements OnInit {

  email:string = ""

  constructor(private usuarioService: UsuarioService, private utilsService: UtilsService) { }

  ngOnInit() {
  }

  async enviarEmail(){
    if(this.email == ""){
      this.utilsService.presentToastSuccess("Preencha o E-mail")
    }else{
      const retorno = await this.usuarioService.enviarEmail(this.email)
      if(retorno){
        this.utilsService.presentToastSuccess("E-mail para a redefinição de senha enviado com sucesso")
      }
    }
  }
}
