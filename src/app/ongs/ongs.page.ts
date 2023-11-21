import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OngService } from '../services/ong.service';
import { urlBase, UtilsService } from '../services/utilidades.service';
import { Geolocation } from '@capacitor/geolocation';
import { GeolocalizacaoService } from '../services/geolocalizacao.service';

@Component({
  selector: 'app-ongs',
  templateUrl: './ongs.page.html',
  styleUrls: ['./ongs.page.scss'],
})
export class OngsPage implements OnInit {


  public home!: string;
  private activatedRoute = inject(ActivatedRoute);
  urlFoto: any = `${urlBase}/uploads/`;
  cidade: string = ""

  public retorno: any = [];
  ongsApresentadas: any = [];

  constructor(private ongService: OngService, private router: Router, private geolocalizacao: GeolocalizacaoService,
    private utilsService: UtilsService) {
    this.getOngs();
  }

  async printCurrentPosition() {
    this.utilsService.presentToast("Buscando a cidade...")
    const coordinates = await Geolocation.getCurrentPosition();
    const geocode: any = await this.geolocalizacao.getAddres(coordinates.coords.latitude, coordinates.coords.longitude)
    this.cidade = geocode.features[0].properties.city;

  };

  getOngs() {
    this.ongService.getOngBySituacao("Aprovada").then((ongs) => {
      this.retorno = ongs;
      console.log(ongs);

      if (this.retorno) {
        this.retorno.forEach((ong: any) => {
          ong.logo_path = this.urlFoto + ong.logo_path
        });
        this.ongsApresentadas = this.retorno
      }

    }).catch((erro) => {
      console.log(erro)
    });
  }

  getOngsCidade() {
    console.log(this.cidade)
    if (this.cidade == "") {
      this.ongsApresentadas = this.retorno
      this.utilsService.presentToastSuccess("Apresentando todas as ONGs")
    } else if (this.retorno) {
      this.ongsApresentadas = []
      this.retorno.forEach((ong: any) => {
        if (ong.cidade.nome == this.cidade) {
          this.ongsApresentadas.push(ong)
        }
      });
      if (!this.ongsApresentadas.length) {
        this.utilsService.presentToastWarning("Nenhuma ONG foi encontrada!")
      } else {
        this.utilsService.presentToastSuccess("ONGs filtradas com sucesso!")
      }
    }
  }

  acessarOng(id: number) {
    this.router.navigate(['/visualizar-ong/', id]);
  }

  ngOnInit() {
    this.home = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

}
