import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../services/animal.service';
import { EspecieService } from '../services/especie.service';
import { RacaService } from '../services/raca.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-atualiza-animal',
  templateUrl: './atualiza-animal.page.html',
  styleUrls: ['./atualiza-animal.page.scss'],
})
export class AtualizaAnimalPage implements OnInit {

  animalSelecionado: any = {};
  especies: any;
  especieSelecionada: any;
  racas: any;
  retorno!: any;
  arquivo: any;

  novoAnimal = {
    nome: "",
    idade: "",
    porte: "",
    descricao: "",
    situacao: "",
    foto_path: "",
    raca_id: "",
    ong_id: "",
    raca: {
      id: "",
      nome: "",
      especie_id: "",
      especie: {
        id: "",
        nome_comum: "",
        nome_cientifico: ""
      }
    },
  }

  constructor(private route: ActivatedRoute,
    public toastController: ToastController,
    private animalService: AnimalService,
    private especieService: EspecieService,
    private racaService: RacaService,
    private router: Router) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        const id = +params['id'];
        this.getSingleAnimal(id);
      }
    });

    this.especieService.getAll().then((retorno) => {
      this.especies = retorno;
    }).catch((erro) => {
      console.log(erro);
    });

    this.racaService.getAll().then((retorno) => {
      this.racas = retorno;
    }).catch((erro) => {
      console.log(erro);
    });
  }

  getSingleAnimal(id: number) {
    this.animalService.getSingleAnimal(id).then((animal) => {
      this.animalSelecionado = animal;
      this.novoAnimal = this.animalSelecionado;
      //console.log(this.novoAnimal.raca.nome);
    }).catch((erro) => {
      console.log(erro);
    })
  }

  async putAnimal(animal: any) {
    //Realiza a alteração do arquivo antes de enviar as mudanças, o middleware que apaga o arquivo antigo é chamado nas rotas do banckend
    if (this.arquivo != undefined && this.arquivo != '') {
      await this.uploadFilesToServer();
    }
    if (this.camposValidos(animal)) {
      this.animalService.update(this.animalSelecionado.id, this.novoAnimal).then((animal) => {
        this.retorno = animal;
        this.presentToast("Animal atualizado com sucesso!");
      }).catch((erro) => {
        console.log(erro);
      })
    }
  }

  enviaAnimal() {
    const atualizaAnimal = {
      nome: this.novoAnimal.nome,
      idade: this.novoAnimal.idade,
      porte: this.novoAnimal.porte,
      situacao: this.novoAnimal.situacao,
      foto_path: this.novoAnimal.foto_path,
      descricao: this.novoAnimal.descricao,
      ong_id: this.novoAnimal.ong_id,
      raca_id: this.novoAnimal.raca_id
    }
    this.putAnimal(atualizaAnimal);
    setTimeout(() => {
      this.voltaPagina();
    }, 1000);
  }

  voltaPagina() {
    this.router.navigate([`ong-info/${this.animalSelecionado.ong_id}`]);
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

  //Pega o valor do id da espécie selecionada na página e retorna as raças da espécie selecionada
  onEspecieChange(event:any){
    const id = event.detail.value;
    this.racaService.getRacaByEspecie(id).then((retorno) => {
      this.racas = retorno || {};
      this.novoAnimal.raca.nome = "";
    }).catch((erro) => {
      console.log(erro);
    })
  }

  //Função para pegar o setar a variavel arquivo no momento em que é feito o upload
  onUpload(event: any) {
    this.arquivo = event.target.files;
    //console.log(this.arquivo)
  }

  //Função que armazena o arquivo na pasta upload e coloca o nome dele na variavel foto_path
  async uploadFilesToServer() {
    const formData = new FormData();
    formData.append('arquivo', this.arquivo[0]);
    //console.log(formData)
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
