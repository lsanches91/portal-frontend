import { Component, OnInit, inject } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { OngService } from '../services/ong.service';
import { ActivatedRoute, Router } from '@angular/router';
import { urlBase } from '../services/utilidades.service';

@Component({
  selector: 'app-avaliar-ongs',
  templateUrl: './avaliar-ongs.page.html',
  styleUrls: ['./avaliar-ongs.page.scss'],
})
export class AvaliarOngsPage implements OnInit {

  public listarOng!: string;
  novaOng: any = {};
  pendentes!: any;
  aprovadas!: any;
  bloqueadas!: any;
  retorno!: any;
  isModalVisualizarOpen: boolean = false;
  isModalVisualizarOpen2: boolean = false;
  isModalVisualizarOpen3: boolean = false;
  urlFoto: any = `${urlBase}/uploads/`;
  isBotaoAprovadas: boolean = false;
  isBotaoBloqueadas: boolean = false;
  isBotaoPendentes: boolean = false;

  ongSelecionada: any = {
    nome_fantasia: "",
    cnpj: "",
    email: "",
    telefone: "",
    logradouro: "",
    numero: "",
    bairro: "",
    cep: "",
    uf: "",
    descricao: "",
    situacao: "",
    logo_path: ""
  }
  constructor(private route: ActivatedRoute, public toastController: ToastController, private alertController: AlertController, private ongService: OngService, private router: Router) {

  }

  getOngsAprovadas() {
    const situacao = "Aprovada";
    this.ongService.getOngBySituacao(situacao).then((ongs) => {
      this.aprovadas = ongs;
      console.log(ongs);
    }).catch((erro) => {
      console.log(erro)
    });
  }

  getOngsBloqueadas() {
    const situacao = "Bloqueada";
    this.ongService.getOngBySituacao(situacao).then((ongs) => {
      this.bloqueadas = ongs;
      console.log(ongs);
    }).catch((erro) => {
      console.log(erro)
    });
  }

  getOngsPendentes() {
    const situacao = "Pendente";
    this.ongService.getOngBySituacao(situacao).then((ongs) => {
      this.pendentes = ongs;
      console.log(ongs);
    }).catch((erro) => {
      console.log(erro)
    });
  }

  public async bloquearOng(pos: number) {
    const alert = await this.alertController.create({
      header: 'Certeza de que deseja bloquear esta ONG?',
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

  public async aceitarOng(pos: number) {
    const alert = await this.alertController.create({
      header: 'Certeza de que deseja aceitar esta ONG?',
      buttons: [
        {
          text: 'Não',
        },
        {
          text: 'Sim',
          handler: () => {
            this.aceitar(pos);
          },
        },
      ],
    });

    await alert.present();
  }

  public async remover(id: number) {
    try {
      console.log(id);

      this.ongSelecionada.situacao = "Bloqueada";
      this.ongSelecionada.outroCampo = this.novaOng.outroCampo;
      this.ongSelecionada.nome_fantasia = this.novaOng.nome_fantasia;
      this.ongSelecionada.cnpj = this.novaOng.cnpj;
      this.ongSelecionada.email = this.novaOng.email;
      this.ongSelecionada.telefone = this.novaOng.telefone;
      this.ongSelecionada.logradouro = this.novaOng.logradouro;
      this.ongSelecionada.numero = this.novaOng.numero;
      this.ongSelecionada.bairro = this.novaOng.bairro;
      this.ongSelecionada.cep = this.novaOng.cep;
      this.ongSelecionada.uf = this.novaOng.uf;
      this.ongSelecionada.descricao = this.novaOng.descricao;
      this.ongSelecionada.logo_path = this.novaOng.logo_path;

      console.log(this.ongSelecionada);
      const ongAtualizada = await this.ongService.update(this.novaOng.id, this.ongSelecionada);
      this.retorno = ongAtualizada;
      console.log(this.retorno);
      this.presentToast("ONG bloqueada com sucesso!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (erro) {
      console.log(erro);
    }
  }

  public async aceitar(id: number) {
    try {
      console.log(id);

      this.ongSelecionada.situacao = "Aprovada";
      this.ongSelecionada.outroCampo = this.novaOng.outroCampo;
      this.ongSelecionada.nome_fantasia = this.novaOng.nome_fantasia;
      this.ongSelecionada.cnpj = this.novaOng.cnpj;
      this.ongSelecionada.email = this.novaOng.email;
      this.ongSelecionada.telefone = this.novaOng.telefone;
      this.ongSelecionada.logradouro = this.novaOng.logradouro;
      this.ongSelecionada.numero = this.novaOng.numero;
      this.ongSelecionada.bairro = this.novaOng.bairro;
      this.ongSelecionada.cep = this.novaOng.cep;
      this.ongSelecionada.uf = this.novaOng.uf;
      this.ongSelecionada.descricao = this.novaOng.descricao;
      this.ongSelecionada.logo_path = this.novaOng.logo_path;

      console.log(this.ongSelecionada);
      const ongAtualizada = await this.ongService.update(this.novaOng.id, this.ongSelecionada);
      this.retorno = ongAtualizada;
      console.log(this.retorno);
      this.presentToast("ONG aprovada com sucesso!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (erro) {
      console.log(erro);
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

  ionViewWillEnter() {
  }

  ngOnInit() {

  }

  async openVisualizarOng(isOpen: boolean) {
    this.isModalVisualizarOpen = isOpen;
  }

  async visualizarONGSelecionada(id: number) {
    await this.getOngById(id);
    this.openVisualizarOng(true);
  }

  async openVisualizarOng2(isOpen: boolean) {
    this.isModalVisualizarOpen2 = isOpen;
  }

  async visualizarONGSelecionada2(id: number) {
    await this.getOngById(id);
    this.openVisualizarOng2(true);
  }

  async openVisualizarOng3(isOpen: boolean) {
    this.isModalVisualizarOpen3 = isOpen;
  }

  async visualizarONGSelecionada3(id: number) {
    await this.getOngById(id);
    this.openVisualizarOng3(true);
  }

  async getOngById(id: number) {
    this.ongService.getSingleOng(id).then((retorno) => {
      this.novaOng = retorno;
    }).catch((erro) => {
      console.log(erro);
    })
  }

  botaoAprovadas(isAtivo: boolean) {
    this.isBotaoAprovadas = isAtivo;
    this.isBotaoBloqueadas = false;
    this.isBotaoPendentes = false;
    this.getOngsAprovadas();
  }

  botaoBloqueadas(isAtivo: boolean) {
    this.isBotaoBloqueadas = isAtivo;
    this.isBotaoPendentes = false;
    this.isBotaoAprovadas = false;
    this.getOngsBloqueadas();
  }

  botaoPendentes(isAtivo: boolean) {
    this.isBotaoPendentes = isAtivo;
    this.isBotaoBloqueadas = false;
    this.isBotaoAprovadas = false;
    this.getOngsPendentes();
  }

}
