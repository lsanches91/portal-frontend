import { Component, OnInit, inject } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router }  from '@angular/router';

@Component({
  selector: 'app-listar-colaborador',
  templateUrl: './listar-colaborador.page.html',
  styleUrls: ['./listar-colaborador.page.scss'],
})
export class ListarColaboradorPage implements OnInit {

  public listarColaborador!: string;
  private activatedRoute = inject(ActivatedRoute);
  retorno:any[] = [];

  constructor(private route:ActivatedRoute, public toastController: ToastController, private alertController: AlertController, private router:Router) { 
    
  }

  ionViewWillEnter(){
    
  }
  /*
  getColaboradores(){
    this.ongService.getAll().then((colaboradores) => {
      this.retorno = colaboradores;
      console.log(colaboradores);
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
    this.ongService.delete(id)
    .then(() => {
      this.presentToast("Colaborador bloqueado com sucesso!");
      console.log("Colaborador bloqueado.");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
    .catch((erro) => {
      console.log(erro);
    });
  }
*/
  private async presentToast(mensage: string) {
    const toast = await this.toastController.create({
      message: mensage,
      duration: 4000,
      position: 'top'
    });
    toast.present();
  }

  editarOng(id:number){
    this.router.navigate(['/editar-colaborador', id]);
  }

  ngOnInit() {
    this.listarColaborador = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

}
