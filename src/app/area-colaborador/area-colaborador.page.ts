import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColaboradorService } from '../services/colaborador.service';
import { UsuarioService } from '../services/usuario.service';
import { urlBase } from '../services/utilidades.service';

@Component({
  selector: 'app-area-colaborador',
  templateUrl: './area-colaborador.page.html',
  styleUrls: ['./area-colaborador.page.scss'],
})
export class AreaColaboradorPage implements OnInit {

  public areaColaborador!: string;
  private activatedRoute = inject(ActivatedRoute);
  usuario: any = {};
  urlFoto: any = `${urlBase}/uploads/`;

  ongs: any = [{
    usuario_id: "",
    ong_id: "",
    situacao: "",
    ong: {
      id: "",
      logo_path: ""
    }
  }];

  constructor(private router: Router,
    private usuarioService: UsuarioService,
    private colaboradorService: ColaboradorService) {

    this.getOngsDoUsuarioLogado();

  }

  async getOngsDoUsuarioLogado() {
    this.usuario = await this.usuarioService.getUsuarioLogado();
    if (this.usuario.nivel != "A") {
      this.getOngsUsuario(this.usuario.id);
    }
    else {
      this.getOngsAdministrador();
    }
  }

  getOngsAdministrador() {
    this.colaboradorService.getAll().then((retorno) => {
      this.ongs = retorno;

      console.log("Antes: ");
      console.log(this.ongs);


      //remove os valores de ong duplicados
      this.ongs = this.ongs.filter((item:any, index:any, self:any) =>
      index === self.findIndex((t: { ong: { id: any; }; }) => t.ong.id === item.ong.id)
    );

      console.log("Depois: ");
      console.log(this.ongs);


    }).catch((erro) => {
      console.log(erro)
    });
  }

  getOngsUsuario(id: number) {
    //Busca todas as ONGs em que o usuário é colaborador e que sua situação como colaborador seja "Ativado"
    this.colaboradorService.getAllOngsByUsuario(id).then((retorno) => {
      this.ongs = retorno;
      console.log(this.ongs);
      if (this.ongs) {
        this.ongs.forEach((colaborador: {ong: {logo_path: string}}) => {
          colaborador.ong.logo_path = this.urlFoto + colaborador.ong.logo_path;
        });
      }

    }).catch((erro) => {
      console.log(erro)
    });
  }

  acessarOng(id: number) {
    this.router.navigate(['/ong-info', id]);
  }


  ngOnInit() {
    this.areaColaborador = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

}
function isPropValuesEqual(foundItem: any, item: any, propNamesArray: unknown[]) {
  throw new Error('Function not implemented.');
}

