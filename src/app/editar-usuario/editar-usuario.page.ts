import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';
import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';
import { CidadeService } from '../services/cidade.service';
import { UtilsService } from '../services/utilidades.service';
import { GeolocalizacaoService } from '../services/geolocalizacao.service';
import { EstadoService } from '../services/estado.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {

  usuarioSelecionado: any = {};
  retorno!: any;

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
    cidade_id: 0,
    nivel: "C",
    situacao: "P",
  }

  estados: any = [];
  cidades: any = [];

  estadoSelecionado: string = "";

  cidadeSelecionada = ""
  cidadeSelecionada_id = ""

  selectDisabled: boolean = true;

  readonly cpfMask: MaskitoOptions = {
    mask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
  };

  readonly telMask: MaskitoOptions = {
    mask: ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  };

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

  constructor(private route: ActivatedRoute,
    public toastController: ToastController,
    private usuarioService: UsuarioService,
    private cidadeService: CidadeService,
    private estadoService: EstadoService,
    private utilsService: UtilsService,
    private geolocalizacaoService: GeolocalizacaoService,
    private router: Router) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        const id = +params['id'];
        this.getSingleUsuario(id);
      }
    });
  }

  ngOnInit() {
  }

  async verificaEstados() {
    this.estadoService.getAll().then(async (estados) => {
      if (estados.length == 0) {
        this.utilsService.presentToast("Importando estados e cidades, isso pode demorar um pouco...")
        await this.estadoService.importEstados()
        await this.cidadeService.importCidades()
        this.estados = estados 
      }
    }).catch((erro) => {
      console.log(erro);
    });
  }

  onEstadoChange(event: any) {
    const sigla = event.detail.value
    this.cidadeService.getCidadeByEstado(sigla).then((retorno) => {
      this.cidades = retorno || {}
      this.cidadeSelecionada = ""
      this.selectDisabled = false
    }).catch((erro) => {
      console.log(erro);
    })
  }

  onCidadeChange(event: any) {
    const id = event.detail.value
    this.cidadeService.getCidadeById(id).then((cidade: any) => {
      this.cidadeSelecionada = cidade.nome
      console.log(this.cidadeSelecionada)
    }).catch((error: any) => {
      this.utilsService.presentToastError(error.error.error);
    });
  }

  async buscarEndereco() {
    if (this.novoUsuario.cep == "") {
      this.utilsService.presentToastWarning("Preencha o CEP")
    } else {
      let CEP = parseInt(this.novoUsuario.cep.replace(/\D/g, ''))
      await this.geolocalizacaoService.getAddresByCEP(CEP).then(async (retorno: any) => {
        this.novoUsuario.logradouro = retorno.logradouro
        this.novoUsuario.bairro = retorno.bairro
        await this.cidadeService.getCidadeByNome(retorno.uf, retorno.localidade).then((cidade: any) => {
          this.cidadeSelecionada = cidade.nome
          this.cidadeSelecionada_id = cidade.id
          this.estadoSelecionado = cidade.estado_sigla
          this.selectDisabled = false
        })
      })
    }
  }

  getSingleUsuario(id: number) {
    this.usuarioService.getSingleusuario(id).then((usuario) => {
      this.usuarioSelecionado = usuario;
      this.novoUsuario = this.usuarioSelecionado;
    }).catch((erro) => {
      console.log(erro);
    })
  }

  putUsuario(usuario: any) {
    if (this.camposValidos(usuario)) {
      this.usuarioService.update(this.usuarioSelecionado.id, this.novoUsuario).then((usuario) => {
        this.retorno = usuario;
        console.log(this.retorno);
        this.presentToast("Usuario editado com sucesso!");
      }).catch((erro) => {
        console.log(erro);
      })
    }
  }

  enviaUsuario() {
    this.putUsuario(this.novoUsuario);
    setTimeout(() => {
      this.voltaPagina();
    }, 1000);
  }

  voltaPagina() {
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
