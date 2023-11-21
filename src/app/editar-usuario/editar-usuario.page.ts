import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';
import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {

  usuarioSelecionado:any = {};
  retorno!:any;

  novoUsuario = {
    nome: "",
    cpf: "",
    celular: "",
    email: "",
    senha: "",
    confirmaSenha: "",
    cep: "",
    logradouro: "",
    bairro: "",
    numero: "",
    cidade: "",
    uf: "",
    nivel: "C",
    situacao: "P",
  }

  readonly cpfMask: MaskitoOptions = {
    mask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
  };

  readonly telMask: MaskitoOptions = {
    mask: ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  };

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

  constructor(private route:ActivatedRoute, public toastController: ToastController, private usuarioService: UsuarioService, private router:Router) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        const id = +params['id'];
        this.getSingleUsuario(id);
      }
    });
   }

  ngOnInit() {
  }

  getSingleUsuario(id:number){
    this.usuarioService.getSingleusuario(id).then((usuario) => {
      this.usuarioSelecionado = usuario;
      this.novoUsuario = this.usuarioSelecionado;
    }).catch((erro) => {
      console.log(erro);
    })
  }

  putUsuario(usuario:any){
    if(this.camposValidos(usuario)){
      this.usuarioService.update(this.usuarioSelecionado.id, this.novoUsuario).then((usuario) => {
        this.retorno = usuario;
        console.log(this.retorno);
        this.presentToast("Usuario editado com sucesso!");
      }).catch((erro) => {
        console.log(erro);
      })
    }
  }

  enviaUsuario(){
    this.putUsuario(this.novoUsuario);
    setTimeout(() => {
      this.voltaPagina();
    }, 1000);    
  }

  voltaPagina(){
    this.router.navigate([`perfil-usuario`]);
  }

  camposValidos(dados: any): boolean {
    for (const index in dados) {
      if (!dados[index]) {
        if (typeof dados[index] === 'string' && dados[index].trim() === '') {
          return false;
        }
        else {
          return false;
        }
      }
    }
    return true;
  }

  private async presentToast(mensage: string) {
    const toast = await this.toastController.create({
      message: mensage,
      duration: 4000,
      position: 'top'
    });
    toast.present();
  }
}
