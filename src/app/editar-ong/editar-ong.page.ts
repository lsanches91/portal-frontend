import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { OngService } from '../services/ong.service';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { EstadoService } from '../services/estado.service';
import { CidadeService } from '../services/cidade.service';
import { UtilsService } from '../services/utilidades.service';
import { GeolocalizacaoService } from '../services/geolocalizacao.service';

@Component({
  selector: 'app-editar-ong',
  templateUrl: './editar-ong.page.html',
  styleUrls: ['./editar-ong.page.scss'],
})
export class EditarOngPage implements OnInit {

  ongSelecionada:any = {};
  retorno!:any;

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
    logo_path: ""
  }

  estados: any = [];
  cidades: any = [];

  estadoSelecionado: string = "";

  cidadeSelecionada = ""
  cidadeSelecionada_id = ""

  selectDisabled: boolean = true;

  readonly telMask: MaskitoOptions = {
    mask: ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  };

  readonly cnpjMask: MaskitoOptions = {
    mask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/],
  };  

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

  constructor(private route:ActivatedRoute, 
    public toastController: ToastController, 
    private ongService: OngService, 
    private estadoService: EstadoService,
    private cidadeService: CidadeService,
    private utilsService: UtilsService,
    private geolocalizacaoService: GeolocalizacaoService,
    private router:Router) { 
    this.route.params.subscribe(params => {
      if (params['id']) {
        const id = +params['id'];
        this.getSingleOng(id);
      }
    });
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

  getSingleOng(id:number){
    this.ongService.getSingleOng(id).then((ong) => {
      this.ongSelecionada = ong;
      this.novaOng = this.ongSelecionada;
    }).catch((erro) => {
      console.log(erro);
    })
  }

  putOng(ong:any){
    if(this.camposValidos(ong)){
      this.novaOng.cidade_id = parseInt(this.cidadeSelecionada_id);
      this.ongService.update(this.ongSelecionada.id, this.novaOng).then((ong) => {
        console.log(this.novaOng);
        this.retorno = ong;
        console.log(this.retorno);
        this.presentToast("ONG editada com sucesso!");
      }).catch((erro) => {
        console.log(erro);
      })
    }
  }

  enviaOng(){
    this.putOng(this.novaOng);
    setTimeout(() => {
      this.voltaPagina();
    }, 1000);    
  }

  voltaPagina(){
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

  private async presentToast(mensage: string) {
    const toast = await this.toastController.create({
      message: mensage,
      duration: 4000,
      position: 'top'
    });
    toast.present();
  }

  ngOnInit() {
  }

}
