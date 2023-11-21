import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { EspecieService } from '../services/especie.service';


@Component({
  selector: 'app-listar-especie',
  templateUrl: './listar-especie.page.html',
  styleUrls: ['./listar-especie.page.scss'],
})
export class ListarEspeciePage implements OnInit {

  especies: any;
  isAprovado: boolean = true;
  isModalVisualizarOpen: boolean = false;
  isModalAtualizarOpen: boolean = false;
  isModalAdicionarOpen: boolean = false;
  retorno: any;
  titulo:string = "Aprovadas";

  especieSelecionada: any = {
    nome_comum: "",
    nome_cientifico: "",
    situacao: ""
  }

  especieNova: any = {
    nome_comum: "",
    nome_cientifico: "",
    situacao: "Aprovado"
  }

  constructor(
    public toastController: ToastController,
    private especieService: EspecieService,
    private alertController: AlertController) {
    this.getEspecieBySitucao("Aprovado");
  }

  //Adiciona uma espécie nova
  async postEspecie(especie: any) {
    if (this.camposValidos(especie)) {
      this.especieService.create(especie).then((retorno) => {
        this.retorno = retorno;
        console.log(this.retorno);
      }).catch((erro) => {
        console.log(erro);
      })
    }
    else {
      this.presentToast("Campos inválidos.");
    }
  }

  //Busca todas as espécies pela sua situação
  async getEspecieBySitucao(situacao: string) {
    if (situacao == "Pendente" || situacao == "Aprovado") {
      this.especieService.getEspecieBySituacao(situacao).then((retorno) => {
        this.especies = retorno;
        if(situacao == "Pendente"){
          this.titulo = "Pendentes";
        }
        else {
          this.titulo = "Aprovadas";
        }
        //console.log("Dentro do getBySituacao");
        //console.log(this.especies);
      }).catch((erro) => {
        console.log(erro);
      });
    }
    else {
      this.presentToast("Situacão precisa ser 'Pendente' ou 'Aprovado'");
    }
  }

  //Busca uma espécie pelo ID
  async getEspecieById(id: number) {
    this.especieService.getSingleEspecie(id).then((retorno) => {
      this.especieSelecionada = retorno;
    }).catch((erro) => {
      console.log(erro);
    })
  }

  //Atualiza uma espécie
  async putEspecie(especie: any) {
    if (this.camposValidos(especie)) {
      this.especieService.update(especie.id, especie).then((especie) => {
        this.retorno = especie;
      }).catch((erro) => {
        console.log(erro);
      })
    }
    else {
      this.presentToast("Informações inválidas.");
    }
  }

  //Deleta uma espécie
  async deleteEspecie(id: number) {
    this.especieService.delete(id).then((especie) => {
      this.retorno = especie;
      console.log(this.retorno);
      this.presentToast("Espécie excluída com sucesso!");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }).catch((erro) => {
      console.log(erro);
    })
  }

  async criaEspecie() {
    //Verifica se os campos são válidos
    if (this.camposValidos(this.especieNova)) {
      //Busca uma espécie com o nome científico para impedir duplicação
      this.especieService.getEspecieByNomeCietifico(this.especieNova.nome_cientifico).then((retornoEsp) => {
        if (retornoEsp.nome_cientifico == this.especieNova.nome_cientifico) {
          this.presentToast("Já há uma espécie com esse Nome Científico.");
        }
      }).catch((erro) => {
        //Busca uma espécie com o nome comum para impedir duplicação
        this.especieService.getEspecieByNomeComum(this.especieNova.nome_comum).then((retorno) => {
          if (retorno.nome_comum == this.especieNova.nome_comum) {
            this.presentToast("Já há uma espécie com esse Nome Comum.");
          }
        }).catch((erro) => {
          //Se não houver nenhuma duplicação, cria a espécie
          this.postEspecie(this.especieNova);
            this.presentToast("Espécie cadastrada com sucesso!");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
        });
      });
    }
    else {
      this.presentToast("Campos inválidos.");
    }
  }

  //Cria uma nova espécie com as informações da espécie selecionada e altera as informações que o usuário passar para então atualizar
  atualizaEspecie() {
    const especieAtualizada = {
      id: this.especieSelecionada.id,
      nome_comum: this.especieSelecionada.nome_comum,
      nome_cientifico: this.especieSelecionada.nome_cientifico,
      situacao: this.especieSelecionada.situacao
    }
    this.putEspecie(especieAtualizada);
    this.presentToast("Espécie atualizada com sucesso!");
    setTimeout(() => {
      this.openAtualizarEspecie(false);
      window.location.reload();
    }, 500);
  }

  aprovaEspecie() {
    var especieAtualizada = {
      id: this.especieSelecionada.id,
      nome_comum: this.especieSelecionada.nome_comum,
      nome_cientifico: this.especieSelecionada.nome_cientifico,
      situacao: "Aprovado"
    }
    this.putEspecie(especieAtualizada);
    this.presentToast("Espécie aprovada com sucesso!");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  //Por algum motivo o *ngIf não estava permitindo atualizar a especieSelecionada, por isso foi feito um getSingleEspecie novamente
  async enviaAprovaEspecie(id: number) {
    this.especieService.getSingleEspecie(id).then((retorno) => {
      this.especieSelecionada = retorno;
      this.aprovaEspecie();
    }).catch((erro) => {
      console.log(erro);
    })
  }

  //Abre ou fecha o modal de visualizar a espécie selecionada
  async openVisualizarEspecie(isOpen: boolean) {
    this.isModalVisualizarOpen = isOpen;
  }

  //Pega a espécie selecionada e abre o seu modal de visualização
  async visualizarEspecieSelecionada(id: number) {
    await this.getEspecieById(id);
    this.openVisualizarEspecie(true);
  }

  //Abre ou fecha o modal de atualizar a espécie selecionada
  async openAtualizarEspecie(isOpen: boolean) {
    this.isModalAtualizarOpen = isOpen;
  }

  //Pega a espécie selecionada e abre o seu modal de atualização
  async atualizarEspecieSelecionada(id: number) {
    await this.getEspecieById(id);
    this.openAtualizarEspecie(true);
  }

  //Abre ou fecha o modal de adicionar a espécie
  async openAdicionarEspecie(isOpen: boolean) {
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
            this.deleteEspecie(pos);
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
