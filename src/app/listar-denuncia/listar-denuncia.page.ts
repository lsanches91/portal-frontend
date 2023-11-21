import { OngService } from './../services/ong.service';
import { Component, OnInit } from '@angular/core';
import { DenunciaService } from '../services/denuncia.service';
import { UsuarioService } from '../services/usuario.service';
import { UtilsService } from '../services/utilidades.service';

@Component({
  selector: 'app-listar-denuncia',
  templateUrl: './listar-denuncia.page.html',
  styleUrls: ['./listar-denuncia.page.scss'],
})
export class ListarDenunciaPage implements OnInit {
  denuncias: any = []
  ongs: any = []
  usuarios: any = []

  retorno: any;

  denunciaSelecionada: any = {
    usuario: {},
    ong: {},
  }
  novaDenuncia: any = {}
  usuarioSelecionado: any = {
    id: 0,
    nome: ""
  }
  ongSelecionada: any = {
    id: 0,
    nome_fantasia: ""
  }
  novaMensagem: string = ""
  isModalVisualizarOpen: boolean = false
  isModalAtualizarOpen: boolean = false
  isModalAdicionarOpen: boolean = false

  constructor(private denunciaService: DenunciaService, private usuarioService: UsuarioService,
    private ongService: OngService, private utilsService: UtilsService) {
    this.listarDenuncias()
    this.listarUsuarios()
    this.listarOngs()
  }

  ngOnInit() {
  }

  listarDenuncias() {
    this.denunciaService.getAll().then((denuncias) => {
      console.log(denuncias)
      this.denuncias = denuncias
    }).catch((error) => {
      console.log(error)
    })
  }

  listarUsuarios() {
    this.usuarioService.getAll().then((usuarios) => {
      this.usuarios = usuarios
    }).catch((error) => {
      console.log(error)
    })
  }

  listarOngs() {
    this.ongService.getAll().then((ongs) => {
      this.ongs = ongs
    }).catch((error) => {
      console.log(error)
    })
  }

  async postDenuncia(denuncia: any) {
    let sucesso!: boolean
    if (this.camposValidos(denuncia)) {
      await this.denunciaService.create(denuncia).then((retorno) => {
        this.retorno = retorno;
        console.log(this.retorno);
        sucesso = true
      }).catch((error) => {
        this.utilsService.presentToastError(error.error.error)
        sucesso = false
      })
    }
    else {
      this.utilsService.presentToastWarning("Campos inválidos.");
      sucesso = false
    }
    return sucesso
  }

  async getDenunciaById(id: number) {
    this.denunciaService.getDenunciaById(id).then((retorno: any) => {
      this.denunciaSelecionada = retorno;
    }).catch((erro) => {
      console.log(erro);
    })
  }

  async putDenuncia(denuncia: any) {
    if (this.camposValidos(denuncia)) {
      this.denunciaService.update(denuncia.ong.id, denuncia.usuario.id, denuncia.id, denuncia).then((denuncia) => {
        this.retorno = denuncia;
      }).catch((erro) => {
        console.log(erro);
      })
    }
    else {
      this.utilsService.presentToastWarning("Informações inválidas.");
    }
  }

  async deleteDenuncia(denuncia: any) {
    this.denunciaService.delete(denuncia.ong.id, denuncia.usuario.id, denuncia.id).then((denuncia) => {
      this.retorno = denuncia;
      console.log(this.retorno);
      this.utilsService.presentToastSuccess("Denuncia excluída com sucesso!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }).catch((erro) => {
      console.log(erro);
    })
  }

  listarPorUsuario() {

  }

  listarPorONG() {

  }

  openAdicionarDenuncia(isOpen: boolean) {
    this.isModalAdicionarOpen = isOpen;
  }

  openVisualizarDenuncia(isOpen: boolean) {
    this.isModalVisualizarOpen = isOpen;
  }

  openAtualizarDenuncia(isOpen: boolean) {
    this.isModalAtualizarOpen = isOpen;
  }

  async bloqueiaOng(ong: any) {
    console.log(ong)
    const alert = await this.utilsService.alertController.create({
      header: 'Confirmar bloqueio da ONG '+ong.nome_fantasia+'?',
      buttons: [
        {
          text: 'Não',
        },
        {
          text: 'Sim',
          handler: () => {
            this.ongService.getSingleOng(ong.id).then((resposta) => {
              const ong: any = resposta
              ong.situacao = "Bloqueada"
              this.ongService.update(ong.id, ong).then(() => {
                this.utilsService.presentToastSuccess("ONG bloqueada com sucesso!")
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }).catch((erro) => {
                console.log(erro);
              })
            }).catch((erro) => {
              console.log(erro);
            })
          },
        },
      ],
    });
    await alert.present();
  }

  atualizaDenuncia() {
    const denunciaAtualizada = {
      id: this.denunciaSelecionada.id,
      usuario_id: this.denunciaSelecionada.usuario.id,
      denuncia_id: this.denunciaSelecionada.ong.id,
      mensagem: this.denunciaSelecionada.mensagem
    }
    this.putDenuncia(denunciaAtualizada);
    this.utilsService.presentToastSuccess("Denúncia atualizada com sucesso!");
    setTimeout(() => {
      this.openAtualizarDenuncia(false);
      window.location.reload();
    }, 500);
  }

  async criaDenuncia() {

    this.novaDenuncia = {
      usuario_id: this.usuarioSelecionado.id,
      ong_id: this.ongSelecionada.id,
      mensagem: this.novaMensagem
    }
    //Verifica se os campos são válidos
    if (this.camposValidos(this.novaDenuncia)) {
      const resposta = await this.postDenuncia(this.novaDenuncia)
      console.log(resposta)
      if (resposta) {
        this.utilsService.presentToastSuccess("Denúncia cadastrada com sucesso!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    }
    else {
      this.utilsService.presentToastWarning("Campos inválidos.");
    }
  }

  async confirmaExclusao(denuncia: any) {
    const alert = await this.utilsService.alertController.create({
      header: 'Confirmar exclusão?',
      buttons: [
        {
          text: 'Não',
        },
        {
          text: 'Sim',
          handler: () => {
            this.deleteDenuncia(denuncia);
          },
        },
      ],
    });
    await alert.present();
  }

  async atualizarDenunciaSelecionada(id: number) {
    await this.getDenunciaById(id)
    this.openAtualizarDenuncia(true)
  }

  async visualizarDenunciaSelecionada(id: number) {
    await this.getDenunciaById(id)
    this.openVisualizarDenuncia(true)
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
}
