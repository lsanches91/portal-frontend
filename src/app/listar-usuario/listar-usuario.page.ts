import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router }  from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.page.html',
  styleUrls: ['./listar-usuario.page.scss'],
})
export class ListarUsuarioPage implements OnInit {

  public listarUsuario!: string;
  private activatedRoute = inject(ActivatedRoute);
  retorno:any[] = [];

  constructor(private route:ActivatedRoute, public toastController: ToastController, private alertController: AlertController, private usuarioService: UsuarioService, private router:Router) {
    this.getUsuarios();
   }

  ionViewWillEnter(){
    this.getUsuarios();
  }

  getUsuarios(){
    this.usuarioService.getAll().then((usuarios) => {
      this.retorno = usuarios;
      console.log(usuarios);
    }).catch((erro) => {
      console.log(erro)
    });
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
            this.remover(pos);
          },
        },
      ],
    });

    await alert.present();
  }

  public remover(id:number){
    console.log(id);
    this.usuarioService.delete(id)
    .then(() => {
      this.presentToast("Usuário excluído com sucesso!");
      console.log("Usuário Excluído.");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
    .catch((erro) => {
      console.log(erro);
    });
  }

  private async presentToast(mensage: string) {
    const toast = await this.toastController.create({
      message: mensage,
      duration: 4000,
      position: 'top'
    });
    toast.present();
  }

  editarUsuario(id:number){
    this.router.navigate(['/editar-usuario', id]);
  }

  ngOnInit() {
    this.listarUsuario = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

}
