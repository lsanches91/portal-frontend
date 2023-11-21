import { Component, OnInit } from '@angular/core';
import { UtilsService, urlBase } from '../services/utilidades.service';
import { AnimalService } from '../services/animal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { SolicitacaoAdocaoService } from '../services/solicitacao-adocao.service';

@Component({
  selector: 'app-formulario-adocao',
  templateUrl: './formulario-adocao.page.html',
  styleUrls: ['./formulario-adocao.page.scss'],
})
export class FormularioAdocaoPage implements OnInit {

  animal: any = {}
  urlFoto: string = ""
  raca: string = ""
  especie: string = ""
  isTelaPequena: boolean = false;

  nome: string = "";
  cpf: string = "";
  telefone: string = "";
  email: string = "";
  cep: string = "";
  logradouro: string = "";
  bairro: string = "";
  numero: string = "";
  cidade: any = {};
  estado: any = {};
  maior_idade: string = "";
  possui_animais: string = "";
  motivo: string = "";
  usuarioLogado: any = {}
  ong: number = 0


  constructor(
    private animalService: AnimalService,
    private router: Router,
    private usuarioService: UsuarioService,
    private utils: UtilsService,
    private solicitacao: SolicitacaoAdocaoService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        const id = +params['id'];
        this.getSingleAnimal(id);
        this.getUsuarioLogado();
      }
    });
  }

  getSingleAnimal(id: number) {
    this.animalService.getSingleAnimal(id).then((animal) => {
      this.animal = animal;
      this.urlFoto = urlBase + "/uploads/" + animal.foto_path;
      this.raca = animal.raca.nome;
      this.especie = animal.raca.especie.nome_comum;
      this.ong = animal.ong_id;
    }).catch((erro) => {
      console.log(erro)
    });
  }

  ngOnInit() {

  }

  async enviarSolicitacao() {
    if (this.possui_animais == "" || this.maior_idade == "" || this.motivo == "") {
      this.utils.presentToastWarning("Preencha todos os campos")
    } else {
      const solicitacao = {
        usuario_id: this.usuarioLogado.id,
        animal_id: this.animal.id,
        ong_id: this.ong,
        maior_idade: this.maior_idade,
        possui_animais: this.possui_animais,
        motivo: this.motivo,
        situacao: "P"
      }
      let resposta = await this.solicitacao.create(solicitacao)
      if (resposta) {
        this.animal.situacao = "I";
        resposta = this.animalService.update(this.animal.id, this.animal);
        if (resposta) {
          this.utils.presentToastSuccess("Solicitação de adoção enviada com sucesso");
          this.router.navigate(['/home']);
        }
      }
    }
  }

  async getUsuarioLogado() {
    this.usuarioLogado = await this.usuarioService.getUsuarioLogado();
    this.nome = this.usuarioLogado.nome;
    this.cpf = this.usuarioLogado.cpf || "";
    this.telefone = this.usuarioLogado.telefone || "";
    this.email = this.usuarioLogado.email || "";
    this.cep = this.usuarioLogado.cep || "";
    this.logradouro = this.usuarioLogado.logradouro || "";
    this.bairro = this.usuarioLogado.bairro || "";
    this.numero = this.usuarioLogado.numero || "";
    this.cidade = this.usuarioLogado.cidade || "";
    this.estado = this.usuarioLogado.cidade.estado || "";
  }
}
