import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '../services/utilidades.service';

@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.page.html',
  styleUrls: ['./redefinir-senha.page.scss'],
})
export class RedefinirSenhaPage implements OnInit {

  nova_senha: string = ""
  confirma_senha: string = ""

  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute, private utilsService: UtilsService, private router: Router) { }

  ngOnInit() {
  }

  async redefinir() {
    if (this.nova_senha == this.confirma_senha) {
       this.route.params.subscribe(async params => {
        if (params['token']) {
          const token = params['token'];
          const usuario = {
            novaSenha: this.nova_senha,
            tipoRedefinicao: "N",
          }
          const retorno = await this.usuarioService.redefinirSenha(token, usuario)
          if(retorno){
            this.utilsService.presentToastSuccess("Senha redefinida com sucesso!")
            this.router.navigate(['/login'])
          }
        }
      });
    }
  }
}
