import { Component } from '@angular/core';
import { UsuarioService } from './services/usuario.service';
import { AuthenticationService } from './services/authentication.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'ONGs', url: '/ongs', icon: 'archive' },
  ];
  constructor(private usuarioService: UsuarioService, private authentication: AuthenticationService, private storage: StorageService) {
    this.adicionaPaginas();
  }

  async adicionaPaginas() {
    const usuarioLogado = await this.usuarioService.getUsuarioLogado()
    if (usuarioLogado) {
      this.appPages.push(
        { title: 'Conta', url: '/perfil', icon: 'person' },
        { title: 'Solicitar Resgate', url: '/resgate', icon: 'archive' },
        { title: 'Área do Colaborador', url: '/area-colaborador', icon: 'business' },        
        { title: 'Meu Perfil', url: '/perfil-usuario', icon: 'person' }
      );
      if (usuarioLogado.nivel == "A") {
        this.appPages.push(
          { title: 'Usuários', url: '/listar-usuario', icon: 'person' },
          { title: 'Espécies', url: '/listar-especie', icon: 'archive' },
          { title: 'Raças', url: '/listar-raca', icon: 'archive' },
          { title: 'Denúncias', url: '/listar-denuncia', icon: 'shield' },
          { title: 'Gerenciar ONGs', url: '/listar-ong', icon: 'archive' },
          { title: 'Avaliar ONGs', url: '/avaliar-ongs', icon: 'archive' },
          { title: 'Colaboradores', url: '/listar-colaborador', icon: 'person' },
          
        );
      }
    }else{
      this.appPages.push(
        { title: 'Conta', url: '/login', icon: 'person' },
      );
    }
  }

}
