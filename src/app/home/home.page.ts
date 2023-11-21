import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OngService } from '../services/ong.service';
import { urlBase, UtilsService } from '../services/utilidades.service';
import { Geolocation } from '@capacitor/geolocation';
import { GeolocalizacaoService } from '../services/geolocalizacao.service';
import { AnimalService } from '../services/animal.service';
import { EspecieService } from '../services/especie.service';
import { RacaService } from '../services/raca.service';
import { EstadoService } from '../services/estado.service';
import { CidadeService } from '../services/cidade.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public home: string = "Animais disponíveis para adoção";
  private activatedRoute = inject(ActivatedRoute);
  urlFoto: any = `${urlBase}/uploads/`;
  cidade: string = ""

  public retorno: any = []

  animais: any = []
  animaisApresentados: any = []
  racas: any = []
  especies: any = []
  estados: any = []
  isModalOpen: boolean = false

  nomeEspecie: string = ""
  nomeRaca: string = ""
  idade: string = ""
  porte: string = ""
  estado: string = ""

  constructor(private ongService: OngService, private router: Router, private geolocalizacao: GeolocalizacaoService,
    private animalService: AnimalService, private especieService: EspecieService, private racaService: RacaService,
    private utilsService: UtilsService, private estadoService: EstadoService, private cidadeService: CidadeService) {
    this.getAnimais();
    this.listarEspecies()
    this.listarRacas()
    this.verificaEstados()
  }

  async printCurrentPosition() {
    this.utilsService.presentToast("Buscando a cidade...");
    const coordinates = await Geolocation.getCurrentPosition();
    const geocode: any = await this.geolocalizacao.getAddres(coordinates.coords.latitude, coordinates.coords.longitude)
    this.cidade = geocode.features[0].properties.city;
  };

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

  listarEspecies() {
    this.especieService.getEspecieBySituacao("Aprovado").then((retorno) => {
      this.especies = retorno;
    }).catch((error) => {
      console.log(error.error.error)
    })
  }

  listarRacas() {
    this.racaService.getRacaBySituacao("Aprovado").then((retorno) => {
      retorno.forEach((raca: any) => {
        if (this.racas.indexOf(raca.nome) == -1) {
          this.racas.push(raca.nome)
        }
      });
      console.log(this.racas)
    }).catch((error) => {
      console.log(error.error.error)
    })
  }

  getAnimais() {
    this.animalService.getAllDisponiveis().then((animais) => {
      this.animais = animais;
      if (this.animais) {
        animais.forEach((animal: any) => {
          animal.foto_path = this.urlFoto + animal.foto_path;
        });
      }
      this.animaisApresentados = this.animais
      console.log(this.animaisApresentados)
    }).catch((erro) => {
      console.log(erro)
    });
  }

  getAnimaisCidade() {
    if (this.animais) {
      this.animaisApresentados = []
      this.animais.forEach((animal: any) => {
        if (animal.ong.cidade.nome == this.cidade) {
          this.animaisApresentados.push(animal)
        }
      });
      if (!this.animaisApresentados.length) {
        this.utilsService.presentToastWarning("Nenhum animal foi encontrado!")
      } else {
        this.utilsService.presentToastSuccess("Animais filtradas com sucesso!")
      }
    }
    if (this.cidade == "") {
      this.animaisApresentados = this.animais
      this.utilsService.presentToastSuccess("Apresentando todos os animais")
    }
  }

  apresentaAnimal(id: number) {
    this.router.navigate(['/animal-info/', id]);
  }

  openFiltros(isOpen: boolean) {
    this.isModalOpen = isOpen;
    console.log(this.isModalOpen)
  }

  aplicarFiltros() {
    // Verifica se algum filtro está ativo
    const algumFiltroAtivo = this.estado !== "" || this.nomeEspecie !== "" || this.nomeRaca !== "" || this.porte !== "" || this.idade !== "";

    if (!algumFiltroAtivo) {
      this.animaisApresentados = this.animais;
      this.utilsService.presentToastSuccess("Apresentando todos os animais");
    } else {
      this.animaisApresentados = this.animais.filter((animal: any) => {
        // Verifica cada filtro individualmente
        const filtroEstado = this.estado !== "" ? animal.ong.cidade.estado.nome === this.estado : true;
        const filtroNomeEspecie = this.nomeEspecie !== "" ? animal.raca.especie.nome_comum === this.nomeEspecie : true;
        const filtroNomeRaca = this.nomeRaca !== "" ? animal.raca.nome === this.nomeRaca : true;
        const filtroPorte = this.porte !== "" ? animal.porte === this.porte : true;
        const filtroIdade = this.idade !== "" ? animal.idade === this.idade : true;

        // Retorna verdadeiro se todos os filtros passarem
        return filtroEstado && filtroNomeEspecie && filtroNomeRaca && filtroPorte && filtroIdade;
      });

      if (this.animaisApresentados.length === 0) {
        this.utilsService.presentToastWarning("Nenhum animal foi encontrado!");
      } else {
        this.utilsService.presentToastSuccess("Animais filtrados com sucesso!");
      }
    }

    this.openFiltros(false);
  }

  ngOnInit() {
    this.home = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

}
