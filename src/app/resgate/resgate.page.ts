import { Component, OnInit } from '@angular/core';
import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';
import { GeolocalizacaoService } from '../services/geolocalizacao.service';
import { Geolocation } from '@capacitor/geolocation';
import { UtilsService } from '../services/utilidades.service';
import { UsuarioService } from '../services/usuario.service';
import { ResgateService } from '../services/resgate.service';
import { Router } from '@angular/router';
import { EstadoService } from '../services/estado.service';
import { CidadeService } from '../services/cidade.service';

@Component({
  selector: 'app-resgate',
  templateUrl: './resgate.page.html',
  styleUrls: ['./resgate.page.scss'],
})
export class ResgatePage implements OnInit {

  descricao: string = ""
  especie: string = ""
  cep: string = ""
  logradouroAproximado: string = ""
  numeroAproximado: string = ""
  pontoReferencia: string = ""
  usuarioLogado: any = {}

  estados: any = []
  cidades: any = []

  estadoSelecionado: string = "";

  cidadeSelecionada = ""
  cidadeSelecionada_id = ""

  selectDisabled: boolean = true;

  constructor(private utilsService: UtilsService,
    private usuarioService: UsuarioService, private estadoService: EstadoService,
    private cidadeService: CidadeService, private geolocalizacaoService: GeolocalizacaoService,
    private resgateService: ResgateService) {
    this.getUsuarioLogado()
    this.estadoService.getAll().then((retorno) => {
      this.estados = retorno
    }).catch((erro) => {
      console.log(erro);
    });
  }

  async verificaEstados() {
    if (this.estados.length == 0) {
      await this.estadoService.importEstados()
      await this.cidadeService.importCidades()
      this.estadoService.getAll().then((retorno) => {
        this.estados = retorno
      }).catch((erro) => {
        console.log(erro);
      });
    }
  }

  readonly cepMask: MaskitoOptions = {
    mask: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  };

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();


  ngOnInit() {
  }

  async getLocalizacao() {
    this.utilsService.presentToast("Buscando localização, isso pode demorar um pouco...")
    const coordinates = await Geolocation.getCurrentPosition()
    const geocode: any = await this.geolocalizacaoService.getAddres(coordinates.coords.latitude, coordinates.coords.longitude)
    this.cep = geocode.features[0].properties.postcode
    this.numeroAproximado = geocode.features[0].properties.housenumber
    this.logradouroAproximado = geocode.features[0].properties.street
    let CEP = parseInt(this.cep.replace(/\D/g, ''))
    await this.geolocalizacaoService.getAddresByCEP(CEP).then(async (retorno: any) => {
      await this.cidadeService.getCidadeByNome(retorno.uf, retorno.localidade).then((cidade: any) => {
        this.estadoSelecionado = cidade.estado_sigla
        this.cidadeService.getCidadeByEstado(this.estadoSelecionado).then((retorno) => {
          this.cidades = retorno || {}
          this.selectDisabled = false
        }).catch((erro) => {
          console.log(erro);
        })
        this.cidadeSelecionada = cidade.nome
        this.cidadeSelecionada_id = cidade.id
      })
    })
  };

  async getUsuarioLogado() {
    this.usuarioLogado = await this.usuarioService.getUsuarioLogado();
  }

  async enviarSolicitacao() {
    if (this.descricao == "" || this.especie == "" || this.cep == "" || this.logradouroAproximado == "" || this.numeroAproximado == "" || this.cidadeSelecionada == "" || this.estadoSelecionado == "" || this.pontoReferencia == "") {
      this.utilsService.presentToastWarning("Preencha todos os campos")
    } else {
      const solicitacao = {
        descricao: this.descricao,
        especie: this.especie,
        cep: this.cep,
        logradouro_aproximado: this.logradouroAproximado,
        numero_aproximado: this.numeroAproximado,
        cidade_id: parseInt(this.cidadeSelecionada_id),
        ponto_referencia: this.pontoReferencia,
        situacao: "P",
        usuario_id: this.usuarioLogado.id
      }
      let resposta = await this.resgateService.create(solicitacao).then((resultado) => {
        this.utilsService.presentToastSuccess("Solicitação de resgate enviada com sucesso");
        window.location.href = "/home";
      }).catch((error) => {
        this.utilsService.presentToastError(error.error.error)
      })
    }
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
}

