import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../services/animal.service';
import { OngService } from '../services/ong.service';
import { UtilsService, urlBase, urlFront } from '../services/utilidades.service';
import { DenunciaService } from '../services/denuncia.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-visualizar-ong',
  templateUrl: './visualizar-ong.page.html',
  styleUrls: ['./visualizar-ong.page.scss'],
})
export class VisualizarOngPage implements OnInit {

  ongSelecionada: any = {
    cidade:{
      estado:{}
    }
  };
  animalSelecionado: any = {};
  retorno: any = {};
  urlFoto: any = `${urlBase}/uploads/`;
  mensagem: string = "";
  isModalOpen: boolean = false;

  constructor(private route: ActivatedRoute, private ongService: OngService, private animalService: AnimalService,
    private router: Router, private utilsService: UtilsService, private denunciaService: DenunciaService,
    private usuarioService: UsuarioService) {

    this.route.params.subscribe(params => {
      if (params['id']) {
        const id = +params['id'];
        this.getSingleOng(id);
      }
    });
  }

  getSingleOng(id: number) {
    this.ongService.getSingleOng(id).then((ong) => {
      this.ongSelecionada = ong;
      //console.log(ong);

      if (this.ongSelecionada && this.ongSelecionada.animal) {
        this.ongSelecionada.animal.forEach((animal: any) => {
          animal.foto_path = this.urlFoto + animal.foto_path;
        });
      }

    }).catch((erro) => {
      console.log(erro)
    });
  }

  apresentaAnimal(id: number) {
    this.router.navigate(['/animal-info/', id]);
  }

  getAnimal(id: number) {
    this.animalService.getSingleAnimal(id).then((animal) => {
      this.animalSelecionado = animal;
    }).catch((erro) => {
      console.log(erro)
    })
  }

  ngOnInit() {
  }

  async enviaDenuncia() {
    const usuario = await this.usuarioService.getUsuarioLogado();
    if (!usuario) {
      this.utilsService.presentToastWarning("Realize o login para denunciar essa ONG")
    } else {
      const denuncia: any = {
        usuario_id: usuario.id,
        ong_id: this.ongSelecionada.id,
        mensagem: this.mensagem
      }
      const retorno = await this.denunciaService.create(denuncia)
      if (retorno) {
        this.utilsService.presentToastSuccess("Denuncia cadastrada com sucesso")
        this.openCadastraDenuncia(false)
      }
    }
  }

  async openCadastraDenuncia(isOpen: boolean) {
    this.mensagem = ""
    this.isModalOpen = isOpen;
  }
}
