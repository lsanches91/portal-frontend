import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OngService } from '../services/ong.service';
import { AnimalService } from '../services/animal.service';
import { ColaboradorService } from '../services/colaborador.service';
import { UsuarioService } from '../services/usuario.service';
import { AdocaoService } from '../services/adocao.service';
import { ResgateService } from '../services/resgate.service';
import { AlertController, ToastController } from '@ionic/angular';
import { urlBase } from '../services/utilidades.service';

@Component({
  selector: 'app-ong-info',
  templateUrl: './ong-info.page.html',
  styleUrls: ['./ong-info.page.scss'],
})
export class OngInfoPage implements OnInit {

  retorno: any = {};
  usuario: any = {};
  colaborador: any = {};
  animais: any = {};
  colaboradores: any = [];
  adocoes: any = [];
  resgates: any = [];
  urlFoto: any = `${urlBase}/uploads/`;
  isBotaoAnimais: boolean = true;
  isBotaoColaboradores: boolean = false;
  isBotaoAdocoes: boolean = false;
  isBotaoResgate: boolean = false;
  isModalAdicionarColaboradorOpen: boolean = false;
  isModalVisualizarColaboradorOpen: boolean = false;
  isModalEditarColaboradorOpen: boolean = false;
  isModalResponderAdocaoOpen: boolean = false;
  isModalResponderResgatePendenteOpen: boolean = false;
  isModalResponderResgateAceitoOpen: boolean = false;
  isModalResgateFinalizadoOpen: boolean = false;
  mensagemLista: string = "Animais da ";
  mensagemAdocao: string = "Pendentes";
  mensagemResgate: string = "Pendentes";
  email: string = "";
  ongSelecionadaId!: number;
  ongSelecionada: any = {
    cidade: {
      estado: {}
    }
  };
  animalSelecionado: any = {};
  colaboradorSelecionado: any = {
    usuario_id: "",
    ong_id: "",
    situacao: "",
    responsavel: "",
    cargo: "",
    usuario: {
      id: "",
      nome: "",
      cpf: "",
      telefone: "",
      logradouro: "",
      numero: "",
      bairro: "",
      cep: "",
      email: "",
      imagem_path: "",
    }
  };
  adocaoSelecionada: any = {
    id: "",
    usuario_id: "",
    animal_id: "",
    ong_id: "",
    maior_idade: "",
    possui_animais: "",
    motivo: "",
    situacao: "",
    usuario: {
      nome: "",
      cpf: "",
      telefone: "",
      email: ""
    },
    animal: {
      id: "",
      nome: "",
      idade: "",
      porte: "",
      descricao: "",
      situacao: "",
      foto_path: "",
      ong_id: "",
      raca_id: ""
    }
  };
  resgateSelecionado: any = {
    id: "",
    descricao: "",
    especie: "",
    logradouro_aproximado: "",
    numero_aproximado: "",
    cidade_id: "",
    cep: "",
    ponto_referencia: "",
    situacao: "",
    usuario_id: "",
    ong_id: "",
    usuario: {
      id: "",
      nome: "",
      email: ""
    },
    cidade: {}
  }

  isResponsavel!: boolean;


  constructor(private route: ActivatedRoute,
    public toastController: ToastController,
    private alertController: AlertController,
    private ongService: OngService,
    private animalService: AnimalService,
    private colaboradorService: ColaboradorService,
    private usuarioService: UsuarioService,
    private adocaoService: AdocaoService,
    private resgateService: ResgateService,
    private router: Router
  ) {


  }

  async verificaResponsavel() {
    this.usuario = await this.usuarioService.getUsuarioLogado();
    this.colaboradorService.getSingleColaborador(this.ongSelecionadaId, this.usuario.id).then((retorno) => {
      this.colaboradorSelecionado = retorno;
      console.log(this.colaboradorSelecionado);
      if (this.colaboradorSelecionado.responsavel == "S") {
        this.isResponsavel = true;
      }
      else {
        this.isResponsavel = false;
      }
    }).catch((erro) => {
      console.log(erro);
    })

  }

  getSingleOng(id: number) {
    this.ongService.getSingleOng(id).then((ong) => {
      this.ongSelecionada = ong;
      console.log(ong)
      if (this.ongSelecionada && this.ongSelecionada.animal) {
        this.ongSelecionada.logo_path = this.urlFoto + this.ongSelecionada.logo_path;
        this.ongSelecionada.animal.forEach((animal: any) => {
          animal.foto_path = this.urlFoto + animal.foto_path;
        });
      }

    }).catch((erro) => {
      console.log(erro)
    });
  }

  getAnimal(id: number) {
    this.animalService.getSingleAnimal(id).then((retorno) => {
      this.animalSelecionado = retorno;
    }).catch((erro) => {
      console.log(erro)
    })
  }

  deleteAnimal(id: number) {
    this.animalService.delete(id).then((retorno) => {
      this.animais = retorno;
      this.presentToast("Animal excluído com sucesso!");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }).catch((erro) => {
      console.log(erro);
    });
  }

  async getAllColaboradores() {
    this.colaboradorService.getAllUsuarioByOng(this.ongSelecionada.id).then((retorno) => {
      this.colaboradores = retorno;
    }).catch((erro) => {
      console.log(erro);
    })
  }

  async getSingleColaborador(usuario_id: number) {
    this.colaboradorService.getSingleColaborador(this.ongSelecionadaId, usuario_id).then((retorno) => {
      this.colaboradorSelecionado = retorno;
      console.log(this.colaboradorSelecionado);
    }).catch((erro) => {
      console.log(erro);
    })
  }

  async putColaborador(ong_id: number, usuario_id: number, colaboradorAtualizado: any) {
    this.colaboradorService.update(ong_id, usuario_id, colaboradorAtualizado).then((retorno) => {
      this.retorno = retorno;
      console.log(this.retorno);
    }).catch((erro) => {
      console.log(erro);
    })
  }

  async atualizaColaborador() {
    const colaboradorAtualizado = {
      usuario_id: this.colaboradorSelecionado.usuario_id,
      ong_id: this.colaboradorSelecionado.ong_id,
      situacao: this.colaboradorSelecionado.situacao,
      responsavel: this.colaboradorSelecionado.responsavel,
      cargo: this.colaboradorSelecionado.cargo
    }
    console.log(colaboradorAtualizado);
    this.putColaborador(colaboradorAtualizado.ong_id, colaboradorAtualizado.usuario_id, colaboradorAtualizado).then((retorno) => {
      this.presentToast("Colaborador alterado com sucesso!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }).catch((erro) => {
      console.log(erro);
      this.presentToast("Erro ao alterar Colaborador.");
    })
  }

  async enviarColaborador() {
    this.usuarioService.getUsuarioByEmail(this.email).then((retorno) => {
      console.log("Achou o email");
      this.colaborador = retorno;
      this.colaboradorService.getSingleColaborador(this.ongSelecionadaId, this.colaborador.id).then((retorno) => {
        console.log("Usuário não está na ONG.");
        var novoColaborador = {
          usuario_id: this.colaborador.id,
          ong_id: this.ongSelecionadaId,
          situacao: "Pendente",
          responsavel: "N"
        }
        this.usuarioService.enviaConvite(this.colaborador.email).then((retorno) => {
          this.retorno = retorno;
          console.log(this.retorno);
        }).catch((erro) => {
          console.log(erro);
        })
        this.postColaborador(novoColaborador);
        this.presentToast("Colaborador adicionado com sucesso!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }).catch((erro) => {
        this.presentToast("Usuário já é um Colaborador desta ONG.");
      })
    }).catch((erro) => {
      this.presentToast("Não há usuário com esse email.");
    });
  }

  async postColaborador(novoColaborador: any) {
    this.colaboradorService.create(novoColaborador).then((retorno) => {
      console.log(retorno);
    }).catch((erro) => {
      console.log(erro);
    })
  }

  async getAllAdocoesBySituacao(situacao: string) {
    this.adocaoService.getAllAdocaoByOngESituacao(this.ongSelecionadaId, situacao).then((retorno) => {
      if (situacao == "R") {
        this.mensagemAdocao = "Recusados";
      }
      else if (situacao == "A") {
        this.mensagemAdocao = "Aprovados";
      }
      else {
        this.mensagemAdocao = "Pendentes";
      }
      this.adocoes = retorno;
      this.adocoes.forEach((adocao: { animal: { foto_path: string } }) => {
        adocao.animal.foto_path = this.urlFoto + adocao.animal.foto_path;
        console.log(adocao.animal.foto_path);
      });
    }).catch((erro) => {
      console.log(erro);
    })
  }

  async getSingleAdocao(id: number, usuario_id: number, animal_id: number) {
    console.log(id);
    console.log(usuario_id);
    console.log(this.ongSelecionadaId);
    console.log(animal_id);
    this.adocaoService.getAdocaoById(id, usuario_id, animal_id, this.ongSelecionadaId).then((retorno) => {
      this.adocaoSelecionada = retorno;
      this.adocaoSelecionada.animal.foto_path = this.urlFoto + this.adocaoSelecionada.animal.foto_path;
      console.log(retorno);
    }).catch((erro) => {
      console.log(erro);
    })
  }

  async putAdocao(id: number, usuario_id: number, animal_id: number, ong_id: number, adocaoAtualizada: any) {
    this.adocaoService.update(id, usuario_id, animal_id, ong_id, adocaoAtualizada).then((retorno) => {
      this.retorno = retorno;
      console.log(this.retorno);
    }).catch((erro) => {
      console.log(erro);
    })
  }

  async atualizarAdocao() {
    var adocaoAtualizada = {
      id: this.adocaoSelecionada.id,
      usuario_id: this.adocaoSelecionada.usuario_id,
      animal_id: this.adocaoSelecionada.animal_id,
      ong_id: this.adocaoSelecionada.ong_id,
      situacao: this.adocaoSelecionada.situacao,
      animal: this.adocaoSelecionada.animal
    }
    if (adocaoAtualizada.situacao == "A") {
      this.putAdocao(adocaoAtualizada.id, adocaoAtualizada.usuario_id, adocaoAtualizada.animal_id, adocaoAtualizada.ong_id, adocaoAtualizada).then((retorno) => {
        var animalAtualizado = {
          id: adocaoAtualizada.animal.id,
          nome: adocaoAtualizada.animal.nome,
          idade: adocaoAtualizada.animal.idade,
          porte: adocaoAtualizada.animal.porte,
          descricao: adocaoAtualizada.animal.descricao,
          situacao: "A",
          foto_path: adocaoAtualizada.animal.foto_path.replace(/^http:\/\/localhost:3333\/uploads\//, ''),
          ong_id: adocaoAtualizada.animal.ong_id,
          raca_id: adocaoAtualizada.animal.raca_id
        }
        console.log(animalAtualizado);
        this.animalService.update(parseInt(animalAtualizado.id), animalAtualizado).then((retorno) => {
          console.log(retorno);
          this.presentToast("Solicitação alterada com sucesso!");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }).catch((erro) => {
          console.log(erro);
          this.presentToast("Erro ao alterar o Animal da Solicitação.");
        })
      }).catch((erro) => {
        console.log(erro);
        this.presentToast("Erro ao alterar a Solicitação.");
      })
    } else if (adocaoAtualizada.situacao == "P") {
      this.putAdocao(adocaoAtualizada.id, adocaoAtualizada.usuario_id, adocaoAtualizada.animal_id, adocaoAtualizada.ong_id, adocaoAtualizada).then((retorno) => {
        var animalAtualizado = {
          id: adocaoAtualizada.animal.id,
          nome: adocaoAtualizada.animal.nome,
          idade: adocaoAtualizada.animal.idade,
          porte: adocaoAtualizada.animal.porte,
          descricao: adocaoAtualizada.animal.descricao,
          situacao: "P",
          foto_path: adocaoAtualizada.animal.foto_path.replace(/^http:\/\/localhost:3333\/uploads\//, ''),
          ong_id: adocaoAtualizada.animal.ong_id,
          raca_id: adocaoAtualizada.animal.raca_id
        }
        console.log(animalAtualizado);
        this.animalService.update(parseInt(animalAtualizado.id), animalAtualizado).then((retorno) => {
          console.log(retorno);
          this.presentToast("Solicitação alterada com sucesso!");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }).catch((erro) => {
          console.log(erro);
          this.presentToast("Erro ao alterar o Animal da Solicitação.");
        })
      }).catch((erro) => {
        console.log(erro);
        this.presentToast("Erro ao alterar a Solicitação.");
      })
    }
    else {
      this.putAdocao(adocaoAtualizada.id, adocaoAtualizada.usuario_id, adocaoAtualizada.animal_id, adocaoAtualizada.ong_id, adocaoAtualizada).then((retorno) => {
        var animalAtualizado = {
          id: adocaoAtualizada.animal.id,
          nome: adocaoAtualizada.animal.nome,
          idade: adocaoAtualizada.animal.idade,
          porte: adocaoAtualizada.animal.porte,
          descricao: adocaoAtualizada.animal.descricao,
          situacao: "D",
          foto_path: adocaoAtualizada.animal.foto_path.replace(/^http:\/\/localhost:3333\/uploads\//, ''),
          ong_id: adocaoAtualizada.animal.ong_id,
          raca_id: adocaoAtualizada.animal.raca_id
        }
        console.log(animalAtualizado);
        this.animalService.update(parseInt(animalAtualizado.id), animalAtualizado).then((retorno) => {
          this.presentToast("Solicitação alterada com sucesso!");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }).catch((erro) => {
          console.log(erro);
          this.presentToast("Erro ao alterar o Animal da Solicitação.");
        })
      }).catch((erro) => {
        console.log(erro);
        this.presentToast("Erro ao alterar a Solicitação.");
      })
    }
  }

  async getAllResgatePendente() {
    this.resgateService.getAllResgatePendente().then((retorno) => {
      this.mensagemResgate = "Pendentes";
      this.resgates = retorno;
    }).catch((erro) => {
      console.log(erro);
    })
  }

  async getAllResgateAceito() {
    this.resgateService.getAllResgateAceitoByOng(this.ongSelecionadaId).then((retorno) => {
      this.mensagemResgate = "Aceitos";
      this.resgates = retorno;
    }).catch((erro) => {
      console.log(erro);
    })
  }

  async getAllResgateFinalizado() {
    this.resgateService.getAllResgateFinalizadoByOng(this.ongSelecionadaId).then((retorno) => {
      this.mensagemResgate = "Finalizados";
      this.resgates = retorno;
    }).catch((erro) => {
      console.log(erro);
    })
  }

  async getSingleResgate(id: number, usuario_id: number) {
    this.resgateService.getResgateById(id, usuario_id).then((retorno) => {
      this.resgateSelecionado = retorno;
    }).catch((erro) => {
      console.log(erro);
    })
  }

  async aceitaResgate() {
    this.resgateSelecionado.situacao = "A";
    this.resgateSelecionado.ong_id = this.ongSelecionadaId;
    this.resgateService.update(this.resgateSelecionado.id, this.resgateSelecionado.usuario_id, this.resgateSelecionado).then((retorno) => {
      this.retorno = retorno;
      this.presentToast("Solicitação de Resgate aceito.");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }).catch((erro) => {
      console.log(erro);
    })
  }

  async finalizaResgate() {
    this.resgateSelecionado.situacao = "F";
    this.resgateService.update(this.resgateSelecionado.id, this.resgateSelecionado.usuario_id, this.resgateSelecionado).then((retorno) => {
      this.retorno = retorno;
      this.presentToast("Solicitação de Resgate finalizado.");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }).catch((erro) => {
      console.log(erro);
    })
  }

  addAnimal(id: number) {
    this.router.navigate(['/cria-animal', id]);
  }

  updateAnimal(id: number) {
    this.router.navigate(['/atualiza-animal', id]);
  }

  botaoAnimais(isAtivo: boolean) {
    this.isBotaoAnimais = isAtivo;
    this.isBotaoColaboradores = false;
    this.isBotaoAdocoes = false;
    this.isBotaoResgate = false;
    this.mensagemLista = "Animais da ";
  }

  botaoColaboradores(isAtivo: boolean) {
    this.isBotaoAnimais = false;
    this.isBotaoColaboradores = isAtivo;
    this.isBotaoAdocoes = false;
    this.isBotaoResgate = false;
    this.mensagemLista = "Colaboradores da ";
    this.getAllColaboradores();
  }

  botaoAdocoes(isAtivo: boolean) {
    this.isBotaoAnimais = false;
    this.isBotaoColaboradores = false;
    this.isBotaoAdocoes = isAtivo;
    this.isBotaoResgate = false;
    this.mensagemLista = "Adoções da ";
    this.getAllAdocoesBySituacao("P");
  }

  botaoResgate(isAtivo: boolean) {
    this.isBotaoAnimais = false;
    this.isBotaoColaboradores = false;
    this.isBotaoAdocoes = false;
    this.isBotaoResgate = isAtivo;
    this.mensagemLista = "Resgates da ";
    this.getAllResgatePendente();
  }

  //Abre ou fecha o modal de adicionar a colaborador
  async openAdicionarColaborador(isOpen: boolean) {
    //Busca o usuário logado
    this.usuario = await this.usuarioService.getUsuarioLogado();
    //Verifica se ele é o ADM do sistema
    if (this.usuario.nivel == 'A') {
      this.isModalAdicionarColaboradorOpen = isOpen;
    }
    else {
      //Faz a busca de um único colaborador passando o ID da ONG que foi selecionada na página e o ID do usuário logado
      this.colaboradorService.getSingleColaborador(this.ongSelecionadaId, this.usuario.id).then((retorno) => {
        //Aqui dentro ele faz a verificação se o ID do usuário que está incluído no colaborador que foi buscado é igual
        //ao usuário ID contido da ONG selecionada
        if (this.isResponsavel) {
          this.isModalAdicionarColaboradorOpen = isOpen;
        }
        else {
          this.presentToast("Somente o responsável pela ONG pode adicionar Colaboradores.");
        }
      }).catch((erro) => {
        console.log(erro);
        this.presentToast("O usuário logado não pertence a está ONG.");
      });
    }
  }

  //Abre ou fecha o modal de visualizar o colaborador selecionado
  async openVisualizarColaborador(isOpen: boolean) {
    this.isModalVisualizarColaboradorOpen = isOpen;
  }

  //Pega o calaborador selecionado e abre o seu modal de visualização
  async visualizarColaboradorSelecionado(id: number) {
    await this.getSingleColaborador(id);
    this.openVisualizarColaborador(true);
  }

  //Abre ou fecha o modal de editar o colaborador selecionado
  async openEditarColaborador(isOpen: boolean) {
    this.usuario = await this.usuarioService.getUsuarioLogado();
    if (this.usuario.nivel == 'A') {
      this.isModalEditarColaboradorOpen = isOpen;
    }
    else {
      this.colaboradorService.getSingleColaborador(this.ongSelecionadaId, this.usuario.id).then((retorno) => {
        if (this.isResponsavel) {
          this.isModalEditarColaboradorOpen = isOpen;
        }
        else {
          this.presentToast("Somente o responsável pela ONG pode editar Colaboradores.");
        }
      }).catch((erro) => {
        console.log(erro);
        this.presentToast("O usuário logado não pertence a está ONG.");
      });
    }
  }

  //Pega colaborador e abre o seu modal de edição
  async editarColaboradorSelecionado(id: number) {
    await this.getSingleColaborador(id);
    this.openEditarColaborador(true);
  }

  async openResponderAdocao(isOpen: boolean) {
    this.isModalResponderAdocaoOpen = isOpen;
  }

  //Pega uma adoção e abre seu modal para responder a solicitação
  async responderAdocao(id: number, usuario_id: number, animal_id: number) {
    await this.getSingleAdocao(id, usuario_id, animal_id);
    this.openResponderAdocao(true);
  }

  async openResponderResgatePendente(isOpen: boolean) {
    this.isModalResponderResgatePendenteOpen = isOpen;
  }

  //Pega um resgate pendente e abre seu modal para aceitar a solicitação
  async responderResgatePendente(id: number, usuario_id: number) {
    await this.getSingleResgate(id, usuario_id);
    this.openResponderResgatePendente(true);
  }

  async openResponderResgateAceito(isOpen: boolean) {
    this.isModalResponderResgateAceitoOpen = isOpen;
  }

  //Pega um resgate aceito e abre seu modal para finalizar a solicitação
  async responderResgateAceito(id: number, usuario_id: number) {
    await this.getSingleResgate(id, usuario_id);
    this.openResponderResgateAceito(true);
  }

  async openResgateFinalizado(isOpen: boolean) {
    this.isModalResgateFinalizadoOpen = isOpen;
  }

  //Pega um resgate finalizado e abre seu modal para visualizar a solicitação
  async visualizarResgateFinalizado(id: number, usuario_id: number) {
    await this.getSingleResgate(id, usuario_id);
    this.openResgateFinalizado(true);
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
            this.deleteAnimal(pos);
          },
        },
      ],
    });
    await alert.present();
  }

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      if (params['id']) {
        const id = +params['id'];
        this.ongSelecionadaId = +params['id'];
        this.getSingleOng(id);
      }
    });
    await this.verificaResponsavel();
    console.log(this.isResponsavel);
  }

  public async confirmaExclusaoOng(pos: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar exclusão?',
      buttons: [
        {
          text: 'Não',
        },
        {
          text: 'Sim',
          handler: () => {
            this.removerOng(pos);
          },
        },
      ],
    });
    await alert.present();
  }

  public removerOng(id:number){
    console.log(id);
    this.usuarioService.delete(id)
    .then(() => {
      this.presentToast("ONG excluída com sucesso!");
      console.log("ONG Excluída.");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
    .catch((erro) => {
      console.log(erro);
    });
  }

  editarONG(id:number){
    this.router.navigate(['/editar-ong', id]);
  }
}
