import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { OngService } from '../services/ong.service';
import { UsuarioService } from '../services/usuario.service';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { EstadoService } from '../services/estado.service';
import { CidadeService } from '../services/cidade.service';
import { GeolocalizacaoService } from '../services/geolocalizacao.service';
import { UtilsService } from '../services/utilidades.service';

@Component({
  selector: 'app-cadastrar-ong',
  templateUrl: './cadastrar-ong.page.html',
  styleUrls: ['./cadastrar-ong.page.scss'],
})
export class CadastrarOngPage {

  retorno!: any;
  arquivo: any;
  usuario: any = {};

  novaOng = {
    nome_fantasia: "",
    cnpj: "",
    email: "",
    telefone: "",
    logradouro: "",
    numero: "",
    bairro: "",
    cep: "",
    cidade_id: 0,
    descricao: "",
    situacao: "",
    logo_path: "",
    usuario_id: 0
  }

  estados: any = [];
  cidades: any = [];

  estadoSelecionado: string = "";

  cidadeSelecionada = ""
  cidadeSelecionada_id = ""

  selectDisabled: boolean = true;

  constructor(private route: ActivatedRoute, public toastController: ToastController,
    private ongService: OngService, 
    private estadoService: EstadoService,
    private router: Router, 
    private usuarioService: UsuarioService,
    private cidadeService: CidadeService,
    private utilsService: UtilsService,
    private geolocalizacaoService: GeolocalizacaoService) {
      this.estadoService.getAll().then((retorno) => {
        this.estados = retorno
      }).catch((erro) => {
        console.log(erro);
      });
  }

  async verificaEstados() {
    this.estadoService.getAll().then(async (estados) => {
      if (estados.length == 0) {
        this.utilsService.presentToast("Importando estados e cidades, isso pode demorar um pouco...")
        await this.estadoService.importEstados()
        await this.cidadeService.importCidades()
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
    this.cidadeService.getCidadeById(id).then((cidade:any)=>{
      this.cidadeSelecionada = cidade.nome
      console.log(this.cidadeSelecionada)
    }).catch((error:any) => {
      this.utilsService.presentToastError(error.error.error);
    });
  }

  async buscarEndereco() {
    if (this.novaOng.cep == "") {
      this.utilsService.presentToastWarning("Preencha o CEP")
    } else {
      let CEP = parseInt(this.novaOng.cep.replace(/\D/g, ''))
      await this.geolocalizacaoService.getAddresByCEP(CEP).then(async (retorno: any) => {
        this.novaOng.logradouro = retorno.logradouro
        this.novaOng.bairro = retorno.bairro
        await this.cidadeService.getCidadeByNome(retorno.uf, retorno.localidade).then((cidade: any) => {
          this.cidadeSelecionada = cidade.nome
          this.cidadeSelecionada_id = cidade.id
          this.estadoSelecionado = cidade.estado_sigla
          this.selectDisabled = false
        })
      })
    }
  }

  readonly telMask: MaskitoOptions = {
    mask: ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  };

  readonly cepMask: MaskitoOptions = {
    mask: [ /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  };

  readonly cnpjMask: MaskitoOptions = {
    mask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/],
  };

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

  ngOnInit() {
  }

  private async presentToast(mensage: string) {
    const toast = await this.toastController.create({
      message: mensage,
      duration: 4000,
      position: 'top'
    });
    toast.present();
  }

  async adicionar(ong: any) {
    console.log(this.novaOng);
    if (this.arquivo != undefined) {
      await this.uploadFilesToServer();
    }
    this.usuario = await this.usuarioService.getUsuarioLogado();
    this.novaOng.usuario_id = this.usuario.id;
    this.novaOng.cidade_id = parseInt(this.cidadeSelecionada_id);
    console.log(this.novaOng);
    if (this.usuario.nivel == 'A') {
      this.novaOng.situacao = 'Aprovada';
    }
    else {
      this.novaOng.situacao = 'Pendente';
    }
    if (this.camposValidos(ong)) {
      this.ongService.create(this.novaOng).then((retorno) => {
        
        this.retorno = retorno;

       /* var colaborador = {
          usuario_id: this.usuario.id,
          ong_id: this.retorno.id,
          situacao: "Ativado",
          responsavel: "S"
        }

        this.colaboradorService.create(colaborador).then((retorno) => {
          this.retorno = retorno;
        }).catch((erro) => {
          console.log(erro);
        })
*/
        this.presentToast("Ong adicionada com sucesso!");
      }).catch((erro) => {
        console.log(erro);
      });
    }
  }

  enviaOng() {
    this.adicionar(this.novaOng);
    setTimeout(() => {
      this.voltaPagina()
    }, 1000);
  }

  voltaPagina() {
    this.router.navigate([`listar-ong`]);
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

  onUpload(event: any) {
    this.arquivo = event.target.files;
  }

  async uploadFilesToServer() {
    const formData = new FormData();
    formData.append('arquivo', this.arquivo[0]);
    try {
      let resposta = await this.ongService.uploadArquivo(formData);
      if (resposta != null) {
        this.novaOng.logo_path = resposta.filename
      }
      return resposta;
    } catch (err) {
      console.log(err);
      this.presentToast("Não foi possivel fazer o upload do arquivo!");
    }
  }

}
