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
  enviados:string[] = []

  constructor(private usuarioService: UsuarioService, private utilsService: UtilsService) { }

  ngOnInit() {
  }

  async enviarEmail(){
    if(this.email == ""){
      this.utilsService.presentToastWarning("Preencha o E-mail!")
    }else if(this.enviados.includes(this.email)){
      this.utilsService.presentToastWarning("O E-mail de recuperação de senha já foi enviado para o ")
    }else{
      const retorno = await this.usuarioService.enviarEmail(this.email)
      if(retorno){
        this.utilsService.presentToastSuccess("E-mail para a redefinição de senha enviado com sucesso")
        this.enviados.push(this.email)
      }
    }
  }
}
