import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OngService } from '../api/ong.service';
import { AnimalService } from '../api/animal.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-ong-info',
  templateUrl: './ong-info.page.html',
  styleUrls: ['./ong-info.page.scss'],
})
export class OngInfoPage implements OnInit {

  ongSelecionada:any = {};
  animalSelecionado:any = {};
  retorno:any = {};

  constructor(private route:ActivatedRoute, public toastController: ToastController, private alertController: AlertController, private ongService:OngService, private animalService:AnimalService, private router:Router) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        const id = +params['id'];
        this.getSingleOng(id);
      }
    });
  }

  getSingleOng(id:number){
    this.ongService.getSingleOng(id).then((ong) => {
      this.ongSelecionada = ong;
      console.log(ong);
    }).catch((erro) => {
      console.log(erro)
    });
  }

  getAnimal(id:number){
    this.animalService.getSingleAnimal(id).then((animal) => {
      this.animalSelecionado = animal;
    }).catch((erro) => {
      console.log(erro)
    })
  }

  deleteAnimal(id:number){
    this.animalService.delete(id).then((animal) => {
      this.retorno = animal;
      this.presentToast("Animal excluído com sucesso!");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }).catch((erro) => {
      console.log(erro);
    });
    
  }

  addAnimal(id:number) {
    this.router.navigate(['/cria-animal', id]);
  }

  updateAnimal(id:number){
    this.router.navigate(['/atualiza-animal', id]);
  }

  private async presentToast(mensage: string) {
    const toast = await this.toastController.create({
      message: mensage,
      duration: 4000,
      position: 'top'
    });
    toast.present();
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
            this.deleteAnimal(pos);
          },
        },
      ],
    });
    await alert.present();
  }

  ngOnInit() {
  }
}
