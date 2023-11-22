import { UtilsService } from './../services/utilidades.service';
import { Component, OnInit } from '@angular/core'
import { UsuarioService } from '../services/usuario.service'
import { AuthenticationService } from '../services/authentication.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  nome: string = ""
  cpf: string = ""
  celular: string = ""
  email: string = ""
  cep: string = ""
  logradouro: string = ""
  bairro: string = ""
  numero: string = ""
  cidade:any = {}
  estado:any = {}

  isModalOpen:boolean = false
  senhaAtual: string = ""
  novaSenha: string = ""
  confirmaSenha:string = ""

  recarregarPagina = localStorage.getItem('recarregarPagina') === 'true';

  constructor(private usuarioService: UsuarioService, 
    private authenticaton: AuthenticationService, 
    private router: Router, 
    private utilsService: UtilsService) {
      
    }

  ngOnInit() {
    console.log(this.recarregarPagina);
    if(this.recarregarPagina == true){
      this.recarregarPagina = false;
      localStorage.setItem('recarregarPagina', 'false');

      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
    
    this.verificaUsuarioLogado()
  }

  async verificaUsuarioLogado() {
    const usuario:any = await this.usuarioService.getUsuario()
    console.log(usuario)
    if(usuario){
      this.nome = usuario.nome
      this.cpf = usuario.cpf
      this.celular = usuario.telefone
      this.email = usuario.email
      this.cep = usuario.cep
      this.logradouro = usuario.logradouro
      this.bairro = usuario.bairro
      this.numero = usuario.numero
      this.cidade = usuario.cidade
      this.estado = this.cidade.estado
    }
  }

  deslogar(){
    this.authenticaton.logout()
    this.utilsService.presentToastSuccess("Conta deslogada com sucesso!")
    this.recarregarPagina = true;
    localStorage.setItem('recarregarPagina', 'true');
    location.reload()
  }

  async redefinirSenha(){
    if(this.senhaAtual=="" || this.novaSenha=="" || this.confirmaSenha == ""){
      this.utilsService.presentToastWarning("Preencha todos os campos!")
    }else if(this.novaSenha != this.confirmaSenha){
      this.utilsService.presentToastWarning("As senhas estão divergentes!")
    } else { 
      const usuario = {
        senha: this.senhaAtual,
        novaSenha: this.novaSenha,
        tipoRedefinicao: "L"
      }
      const resposta = await this.usuarioService.redefinirSenha("token", usuario)
      if(resposta){
        await this.utilsService.presentToastSuccess("Senha alterada com sucesso!")
        this.openRedefinirSenha(false)
      }
    }
  }

  openRedefinirSenha(open:boolean){
    this.isModalOpen = open
    if(!open){
      this.novaSenha = ""
      this.senhaAtual = ""
      this.confirmaSenha = ""
    }
  }
}
