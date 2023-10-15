import { Component, OnInit, inject } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { OngService } from '../api/ong.service';
import { ActivatedRoute, Router }  from '@angular/router';

@Component({
  selector: 'app-listar-ong',
  templateUrl: './listar-ong.page.html',
  styleUrls: ['./listar-ong.page.scss'],
})
export class ListarOngPage implements OnInit{

  public listarOng!: string;
  private activatedRoute = inject(ActivatedRoute);
  
	retorno:any[] = [];

  constructor(private route:ActivatedRoute, public toastController: ToastController, private alertController: AlertController, private ongService: OngService, private router:Router) {
    this.getOngs();
  }

  //Essa funnção é chamada sempre que entra na página, o constructor é chamado apenas quando a página é 'construida'
  ionViewWillEnter(){
    this.getOngs();
  }

  getOngs(){
    this.ongService.getAll().then((ongs) => {
      this.retorno = ongs;
      console.log(ongs);
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
      this.presentToast("Ong excluída com sucesso!");
      console.log("Ong Excluída.");
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

  editarOng(id:number){
    this.router.navigate(['/editar-ong', id]);
  }

  ngOnInit() {
    this.listarOng = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

}
