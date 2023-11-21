import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../services/animal.service';
import { EspecieService } from '../services/especie.service';
import { RacaService } from '../services/raca.service';
import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-cria-animal',
  templateUrl: './cria-animal.page.html',
  styleUrls: ['./cria-animal.page.scss'],
})
export class CriaAnimalPage implements OnInit {

  ongSelecionadaID!: number;
  especies: any;
  racas: any;
  retorno!: any;
  arquivo: any;
  isModalEspecieOpen = false;
  isModalRacaOpen = false;

  novoAnimal = {
    nome: "",
    idade: "",
    porte: "",
    descricao: "",
    situacao: "D",
    foto_path: "",
    ong_id: 0,
    raca_id: "",
    raca_especie_id: ""
  }

  novaEspecie = {
    nome_comum: "",
    nome_cientifico: "",
    situacao: ""
  }

  novaRaca = {
    nome: "",
    especie_id: "",
    situacao: ""
  }

  constructor(private route: ActivatedRoute,
    private alertController: AlertController,
    public toastController: ToastController,
    private animalService: AnimalService,
    private especieService: EspecieService,
    private racaService: RacaService,
    private router: Router) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        const id = +params['id'];
        this.ongSelecionadaID = id;
      }
    });

    this.especieService.getEspecieBySituacao("Aprovado").then((retorno) => {
      this.especies = retorno;
    }).catch((erro) => {
      console.log(erro);
    });

    this.racaService.getRacaBySituacao("Aprovado").then((retorno) => {
      this.racas = retorno;
    }).catch((erro) => {
      console.log(erro);
    });
  }


  async postAnimal(animal: any) {
    //Se houver arquivo, realiza o envio dele para o servidor para então armazenar o animal no banco   
    if (this.arquivo != undefined) {
      await this.uploadFilesToServer();
    }
    this.animalService.create(animal).then((retorno) => {
      this.retorno = retorno;
    }).catch((erro) => {
      console.log(erro);
    })
  }

  async enviaAnimal() {
    //Atribui o ID da ONG ao novo animal
    this.novoAnimal.ong_id = this.ongSelecionadaID;
    //Verifica os campos obrigatórios
    if (this.camposValidos(this.novoAnimal)) {
      //Varifica se já existe um animal com o mesmo nome, raça e espécie
      await this.animalService.getAnimalByNomeERaca(this.novoAnimal.nome, this.novoAnimal.raca_id).then(async (retorno) => {
        this.retorno = retorno;
        console.log(this.retorno);
        if (this.retorno != null) {
          this.confirmaCriacao(this.novoAnimal);
        }
        else {
          await this.postAnimal(this.novoAnimal);
          this.presentToast("Animal cadastrado com sucesso!");
          setTimeout(() => {
            this.voltaPagina()
          }, 1000);
        }
      }).catch((erro) => {
        console.log(erro);
      });
    }
    else {
      this.presentToast("Preencha os campos obrigatórios.");
    }


  }

  voltaPagina() {
    this.router.navigate([`ong-info/${this.ongSelecionadaID}`]);
  }

  camposValidos(dados: any): boolean {
    //Armazena o nome dos atributos que não podem ser nulos ou string vazias
    const atributosVerificados = ['nome', 'idade', 'porte', 'raca_id', 'raca_especie_id'];

    for (const atributo of atributosVerificados) {
      if (dados.hasOwnProperty(atributo)) {
        //Verifica se é nulo ou uma string vazia
        if (!dados[atributo] || (typeof dados[atributo] === 'string' && dados[atributo].trim() === '')) {
          return false;
        }
      }
    }
    //Retorna true se todos os atributos são válidos
    return true;
  }

  //Pega o valor do id da espécie selecionada na página e retorna as raças da espécie selecionada
  onEspecieChange(event: any) {
    if (event.detail.value != "+ Cadastrar Espécie") {
      const id = event.detail.value;
      this.racaService.getRacaByEspecieESituacao(id, "Aprovado").then((retorno) => {
        this.racas = retorno || {};
      }).catch((erro) => {
        console.log(erro);
      })
    }
    else {
      this.openCadastraEspecie(true);
    }
  }

  onRacaChange(event: any) {
    if (event.detail.value == "+ Cadastrar Raça") {
      this.openCadastraRaca(true);
    }
  }

  //Função para pegar o setar a variavel arquivo no momento em que é feito o upload
  onUpload(event: any) {
    this.arquivo = event.target.files;
  }

  //Função que armazena o arquivo na pasta upload e coloca o nome dele na variavel foto_path
  async uploadFilesToServer() {
    const formData = new FormData();
    formData.append('arquivo', this.arquivo[0]);
    try {
      let resposta = await this.animalService.uploadArquivo(formData);
      if (resposta != null) {
        this.novoAnimal.foto_path = resposta.filename
      }
      return resposta;
    } catch (err) {
      console.log(err);
      this.presentToast("Não foi possivel fazer o upload do arquivo!");
    }
  }

  //Abre o modal para cadastrar Espécie
  async openCadastraEspecie(isOpen: boolean) {
    this.isModalEspecieOpen = isOpen;
  }

  async postEspecie(especie: any) {
    if (this.camposValidos(especie)) {
      this.especieService.create(especie).then((retorno) => {
        this.retorno = retorno;
      }).catch((erro) => {
        console.log(erro);
      })
    }
  }

  enviaEspecie() {
    this.novaEspecie.situacao = "Pendente";
    this.postEspecie(this.novaEspecie);
    this.presentToast("Espécie cadastrada com sucesso!");
    setTimeout(() => {
      this.openCadastraEspecie(false);
      window.location.reload();
    }, 1000);
  }

  //Abre o modal para cadastrar Raça
  async openCadastraRaca(isOpen: boolean) {
    this.isModalRacaOpen = isOpen;
  }

  async postRaca(raca: any) {
    if (this.camposValidos(raca)) {
      this.racaService.create(raca).then((retorno) => {
        this.retorno = retorno;
      }).catch((erro) => {
        console.log(erro);
      })
    }
  }

  enviaRaca() {
    this.novaRaca.situacao = "Pendente";
    this.postRaca(this.novaRaca);
    this.presentToast("Raça cadastrada com sucesso!");
    setTimeout(() => {
      this.openCadastraRaca(false);
      window.location.reload();
    }, 1000);
  }

  private async presentToast(mensage: string) {
    const toast = await this.toastController.create({
      message: mensage,
      duration: 4000,
      position: 'top'
    });
    toast.present();
  }

  public async confirmaCriacao(novoAnimal: any) {
    const alert = await this.alertController.create({
      header: 'Já existe um animal com o mesmo Nome, Espécie e Raça. Deseja cadastrar mesmo assim?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            setTimeout(() => {
              this.voltaPagina()
            }, 1000);
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.postAnimal(novoAnimal);
            this.presentToast("Animal cadastrado com sucesso!");
            setTimeout(() => {
              this.voltaPagina()
            }, 1000);
          },
        },
      ],
    });
    await alert.present();
  }

  ngOnInit() {
  }

}
