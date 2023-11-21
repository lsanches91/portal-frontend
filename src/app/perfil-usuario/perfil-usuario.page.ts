import { Component, OnInit, inject } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router }  from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { OngService } from '../services/ong.service';
import { ColaboradorService } from '../services/colaborador.service';
import { urlBase } from '../services/utilidades.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {

  urlFoto: any = `${urlBase}/uploads/`;
  public listarOng!: string;
  usuario: any;
  novaOng:any = {};
  ongSelecionadaId!: number;
  ongSelecionada: any = {};
	retorno:any[] = [];
  usuarioLogado:any = {};
  historico!: any;
  colaboradorOngs!: any;
  responsavelOngs!: any;
  isBotaoHistorico: boolean = false;
  isBotaoColaboradorOngs: boolean = false;
  isBotaoResponsavelOngs: boolean = false;
  isModalVisualizarOpen: boolean = false;

  nome: string = "";
  cpf: string = "";
  celular: string = "";
  email: string = "";
  cep: string = "";
  logradouro: string = "";
  bairro: string = "";
  numero: string = "";
  cidade:any = {}
  estado:any = {}

  constructor(
    private router:Router, 
    private usuarioService: UsuarioService, 
    private colaboradorService: ColaboradorService, 
    public toastController: ToastController, 
    private alertController: AlertController,
    private ongService: OngService) {

     }

  ngOnInit() {
    this.verificaUsuarioLogado();
  }

  async verificaUsuarioLogado() {
    this.usuarioLogado = await this.usuarioService.getUsuario();

    if(this.usuarioLogado){
      this.nome = this.usuarioLogado.nome;
      this.cpf = this.usuarioLogado.cpf;
      this.celular = this.usuarioLogado.telefone;
      this.email = this.usuarioLogado.email;
      this.cep = this.usuarioLogado.cep;
      this.logradouro = this.usuarioLogado.logradouro;
      this.bairro = this.usuarioLogado.bairro;
      this.numero = this.usuarioLogado.numero;
      this.cidade = this.usuarioLogado.cidade;
      this.estado = this.cidade.estado;
      console.log(this.usuarioLogado.situacao)
    }else{
      this.router.navigate(['/login']);
    }
  }

  private async presentToast(mensage: string) {
    const toast = await this.toastController.create({
      message: mensage,
      duration: 4000,
      position: 'top'
    });
    toast.present();
  }

  public async confirmaExclusao(pos: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar exclusão?',
      buttons: [
        {
          text: 'Não',
        },
        {
          text: 'Sim',
          handler: () => {
            this.remover(pos);
          },
        },
      ],
    });
    await alert.present();
  }

  public remover(id:number){
    console.log(id);
    this.usuarioService.delete(id)
    .then(() => {
      this.presentToast("Usuario excluída com sucesso!");
      console.log("Usuario Excluída.");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
    .catch((erro) => {
      console.log(erro);
    });
  }

  editarUsuario(id:number){
    this.router.navigate(['/editar-usuario', id]);
  }

  async openVisualizarOng(isOpen: boolean) {
    this.isModalVisualizarOpen = isOpen;
  }

  async visualizarONGSelecionada(id: number) {
    await this.getOngById(id);
    this.openVisualizarOng(true);
  }

  async getOngById(id: number) {
    this.ongService.getSingleOng(id).then((retorno) => {
      this.novaOng = retorno;
    }).catch((erro) => {
      console.log(erro);
    })
  }

  botaoHistorico(isAtivo: boolean) {
    this.isBotaoHistorico = isAtivo;
    this.isBotaoColaboradorOngs = false;
    this.isBotaoResponsavelOngs = false;
    this.getHistorico();
  }

  botaoColaboradorOngs(isAtivo: boolean) {
    this.isBotaoHistorico = false;
    this.isBotaoColaboradorOngs = isAtivo;
    this.isBotaoResponsavelOngs = false;
    this.getColaboradorOngs(this.usuarioLogado.id);
  }

  botaoResponsavelOngs(isAtivo: boolean) {
    this.isBotaoHistorico = false;
    this.isBotaoColaboradorOngs = false;
    this.isBotaoResponsavelOngs = isAtivo;
    this.getResponsavelOngs(this.usuarioLogado.id);
  }

  getHistorico(){

  }

  async getColaboradorOngs(id: number) {
    this.usuarioLogado = await this.usuarioService.getUsuario();

    this.colaboradorService.getAllOngsByUsuario(id).then((retorno) => {
      this.colaboradorOngs = retorno;
    }).catch((erro) => {
      this.presentToast("Usuário logado não possui ONGs como colaborador!");
      console.log(erro);
    })
  }

  async getResponsavelOngs(id: number){
    this.usuarioLogado = await this.usuarioService.getUsuario();

    this.colaboradorService.getSingleColaborador(this.ongSelecionadaId, this.usuario.id).then((retorno) => {
      
      if (retorno.usuario_id == this.ongSelecionada.usuario_id) {
        this.colaboradorService.getAllOngsByUsuario(retorno.usuario_id).then((retorno) => {
          this.colaboradorOngs = retorno;
        }).catch((erro) => {
          this.presentToast("Usuário logado não possui ONGs como responsavel!");
          console.log(erro);
        })
      }
      else {
        this.presentToast("Erro ao listar Ongs Colaboradores.");
      }
    }).catch((erro) => {
      console.log(erro);
      this.presentToast("O usuário logado não pertence a está ONG.");
    });

    
  }

}
