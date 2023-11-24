import { Component, OnInit, HostListener } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = "";
  senha: string = "";
  isMostrarLogo: boolean = window.innerWidth <= 600;

  constructor(private toastController: ToastController,
    private usuarioService: UsuarioService,
    private authentication: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.verificaLoginExistente();
  }

  async presentToast(mensagem: string) {
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
      this.router.navigate(['/perfil'])
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
      localStorage.setItem('recarregarPagina', 'true');
      setTimeout(() => {
        this.router.navigate(['/perfil']);
      }, 1000);
    }
  }

  mostrarLogo() {
    return this.isMostrarLogo;
  }

  // Atualiza o status da div com base na largura da tela
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.atualizarExibicaoLogo();
  }

  private atualizarExibicaoLogo(): void {
    this.isMostrarLogo = window.innerWidth <= 600;
  }

}
