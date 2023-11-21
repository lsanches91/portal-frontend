import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { OngService } from '../services/ong.service';
import { UsuarioService } from '../services/usuario.service';
import { ColaboradorService } from '../services/colaborador.service';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';

@Component({
  selector: 'app-cadastrar-ong',
  templateUrl: './cadastrar-ong.page.html',
  styleUrls: ['./cadastrar-ong.page.scss'],
})
export class CadastrarOngPage {

  retorno!: any;
  arquivo: any;
  usuario: any = {};

  novaOng = {
    nome_fantasia: "",
    cnpj: "",
    email: "",
    telefone: "",
    logradouro: "",
    numero: "",
    bairro: "",
    cep: "",
    cidade:"",
    uf: "",
    descricao: "",
    situacao: "",
    logo_path: "",
    usuario_id: 0
  }

  constructor(private route: ActivatedRoute, public toastController: ToastController,
    private ongService: OngService, private router: Router, private usuarioService: UsuarioService, private colaboradorService: ColaboradorService) {
      
  }

  readonly telMask: MaskitoOptions = {
    mask: ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  };

  readonly cepMask: MaskitoOptions = {
    mask: [ /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  };

  readonly cnpjMask: MaskitoOptions = {
    mask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/],
  };

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

  ngOnInit() {
  }

  private async presentToast(mensage: string) {
    const toast = await this.toastController.create({
      message: mensage,
      duration: 4000,
      position: 'top'
    });
    toast.present();
  }

  async adicionar(ong: any) {
    console.log(this.novaOng);
    if (this.arquivo != undefined) {
      await this.uploadFilesToServer();
    }
    this.usuario = await this.usuarioService.getUsuarioLogado();
    this.novaOng.usuario_id = this.usuario.id;
    console.log(this.novaOng);
    if (this.usuario.nivel == 'A') {
      this.novaOng.situacao = 'Aprovada';
    }
    else {
      this.novaOng.situacao = 'Pendente';
    }
    if (this.camposValidos(ong)) {
      this.ongService.create(this.novaOng).then((retorno) => {
        
        this.retorno = retorno;

       /* var colaborador = {
          usuario_id: this.usuario.id,
          ong_id: this.retorno.id,
          situacao: "Ativado",
          responsavel: "S"
        }

        this.colaboradorService.create(colaborador).then((retorno) => {
          this.retorno = retorno;
        }).catch((erro) => {
          console.log(erro);
        })
*/
        this.presentToast("Ong adicionada com sucesso!");
      }).catch((erro) => {
        console.log(erro);
      });
    }
  }

  enviaOng() {
    this.adicionar(this.novaOng);
    setTimeout(() => {
      this.voltaPagina()
    }, 1000);
  }

  voltaPagina() {
    this.router.navigate([`listar-ong`]);
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

  onUpload(event: any) {
    this.arquivo = event.target.files;
  }

  async uploadFilesToServer() {
    const formData = new FormData();
    formData.append('arquivo', this.arquivo[0]);
    try {
      let resposta = await this.ongService.uploadArquivo(formData);
      if (resposta != null) {
        this.novaOng.logo_path = resposta.filename
      }
      return resposta;
    } catch (err) {
      console.log(err);
      this.presentToast("Não foi possivel fazer o upload do arquivo!");
    }
  }

}
