import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { RacaService } from '../services/raca.service';
import { EspecieService } from '../services/especie.service';

@Component({
  selector: 'app-listar-raca',
  templateUrl: './listar-raca.page.html',
  styleUrls: ['./listar-raca.page.scss'],
})
export class ListarRacaPage implements OnInit {

  racas: any;
  especies: any;
  isAprovado: boolean = true;
  isModalVisualizarOpen: boolean = false;
  isModalAtualizarOpen: boolean = false;
  isModalAdicionarOpen: boolean = false;
  retorno: any;
  titulo:string = "Aprovadas";

  racaSelecionada: any = {
    nome: "",
    situacao: "",
    especie_id: "",
    especie: {
      id: "",
      nome_comum: "",
      nome_cientifico: "",
      situacao: ""
    }
  }

  racaNova: any = {
    nome: "",
    situacao: "Aprovado",
    especie_id: ""
  }

  constructor(
    public toastController: ToastController,
    private alertController: AlertController,
    private racaService: RacaService,
    private especieService: EspecieService) {
    this.getRacaBySitucao("Aprovado");
    this.especieService.getEspecieBySituacao("Aprovado").then((retorno) => {
      this.especies = retorno;
    }).catch((erro) => {
      console.log(erro);
    });
  }

  //Adiciona uma raça nova
  async postRaca(raca: any) {
    this.racaService.create(raca).then((retorno) => {
      this.retorno = retorno;
      console.log(this.retorno);

    }).catch((erro) => {
      console.log(erro);
    })
  }

  criaRaca() {
    var verificaRaca = {
      nome: "",
      situacao: "",
      especie_id: ""
    }
    this.racaService.getSingleRacaByEspecieENome(this.racaNova.nome, this.racaNova.especie_id).then((busca) => {
      verificaRaca = busca;
      console.log(verificaRaca);
      if (verificaRaca == null) {
        if (this.camposValidos(this.racaNova)) {
          this.postRaca(this.racaNova);
          this.presentToast("Raça cadastrada com sucesso!");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
        else {
          this.presentToast("Campos inválidos.");
        }
      }
      else {
        this.presentToast("Já existe uma raça com esse nome para a espécie selecionada.");
      }
    }).catch((erro) => {
      console.log(erro);
    })
  }

  //Busca todas as raças pela sua situação
  async getRacaBySitucao(situacao: string) {
    if (situacao == "Pendente" || situacao == "Aprovado") {
      this.racaService.getRacaBySituacao(situacao).then((retorno) => {
        this.racas = retorno;
        if(situacao == "Pendente"){
          this.titulo = "Pendentes";
        }
        else {
          this.titulo = "Aprovadas";
        }
      }).catch((erro) => {
        console.log(erro);
      });
    }
    else {
      this.presentToast("Situacão precisa ser 'Pendente' ou 'Aprovado'");
    }
  }

  //Busca uma raça pelo ID
  async getRacaById(id: number) {
    this.racaService.getSingleRaca(id).then((retorno) => {
      this.racaSelecionada = retorno;
      console.log(this.racaSelecionada);
    }).catch((erro) => {
      console.log(erro);
    })
  }

  //Atualiza uma raça
  async putRaca(raca: any) {
    if (this.camposValidos(raca)) {
      this.racaService.update(raca.id, raca).then((raca) => {
        this.retorno = raca;
      }).catch((erro) => {
        console.log(erro);
      })
    }
    else {
      this.presentToast("Informações inválidas.");
    }
  }

  //Cria uma nova raça com as informações da raça selecionada e altera as informações que o usuário passar para então atualizar
  atualizaRaca() {
    const racaAtualizada = {
      id: this.racaSelecionada.id,
      nome: this.racaSelecionada.nome,
      especie_id: this.racaSelecionada.especie_id,
      situacao: this.racaSelecionada.situacao
    }
    console.log(racaAtualizada)
    this.putRaca(racaAtualizada);
    this.presentToast("Raça atualizada com sucesso!");
    setTimeout(() => {
      this.openAtualizarRaca(false);
      window.location.reload();
    }, 500);
  }

  //Deleta uma raça
  async deleteRaca(id: number) {
    this.racaService.delete(id).then((especie) => {
      this.retorno = especie;
      console.log(this.retorno);
      this.presentToast("Raça excluída com sucesso!");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }).catch((erro) => {
      console.log(erro);
    })
  }

  aprovaRaca() {
    var racaAtualizada = {
      id: this.racaSelecionada.id,
      nome: this.racaSelecionada.nome,
      especie_id: this.racaSelecionada.especie_id,
      situacao: "Aprovado"
    }
    console.log("Dentro do aprovaRaca");
    console.log(racaAtualizada);
    this.putRaca(racaAtualizada);
    this.presentToast("Raça aprovada com sucesso!");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  //Por algum motivo o *ngIf não estava permitindo atualizar a especieSelecionada, por isso foi feito um getSingleEspecie novamente
  async enviaAprovaRaca(id: number) {
    this.racaService.getSingleRaca(id).then((retorno) => {
      this.racaSelecionada = retorno;
      console.log("Dentro do enviaAprovaRaca");
      console.log(this.racaSelecionada);
      this.aprovaRaca();
    }).catch((erro) => {
      console.log(erro);
    })
  }

  //Abre ou fecha o modal de visualizar a raça selecionada
  async openVisualizarRaca(isOpen: boolean) {
    this.isModalVisualizarOpen = isOpen;
  }

  //Pega a raça selecionada e abre o seu modal de visualização
  async visualizarRacaSelecionada(id: number) {
    await this.getRacaById(id);
    this.openVisualizarRaca(true);
  }

  //Abre ou fecha o modal de atualizar a raça selecionada
  async openAtualizarRaca(isOpen: boolean) {
    this.isModalAtualizarOpen = isOpen;
  }

  //Pega a raça selecionada e abre o seu modal de atualização
  async atualizarRacaSelecionada(id: number) {
    await this.getRacaById(id);
    this.openAtualizarRaca(true);
  }

  //Abre ou fecha o modal de adicionar a raça
  async openAdicionarRaca(isOpen: boolean) {
    this.isModalAdicionarOpen = isOpen;
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
            this.deleteRaca(pos);
          },
        },
      ],
    });
    await alert.present();
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
