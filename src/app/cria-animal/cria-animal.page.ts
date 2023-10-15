import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../api/animal.service';
import { OngService } from '../api/ong.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cria-animal',
  templateUrl: './cria-animal.page.html',
  styleUrls: ['./cria-animal.page.scss'],
})
export class CriaAnimalPage implements OnInit {

  ongSelecionadaID!:number;
  retorno!:any;

  novoAnimal = {
    nome: "",
    especie: "",
    idade: "",
    porte: "",
    raca: "",
    descricao: "",
    situacao: "",
    foto_path: "",
    ong_id: 0
  }

  constructor(private route:ActivatedRoute, public toastController: ToastController, private ongService:OngService, private animalService:AnimalService, private router:Router) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        const id = +params['id'];
        this.ongSelecionadaID = id;
      }
    });
  }

  postAnimal(animal:any){
    this.novoAnimal.ong_id = this.ongSelecionadaID;
    if(this.camposValidos(animal)){
      this.animalService.create(animal).then((retorno) => {
        this.retorno = retorno;
        console.log(this.retorno);
      }).catch((erro) => {
        console.log(erro);
      })
    }
  }

  enviaAnimal(){
    this.postAnimal(this.novoAnimal);
    this.presentToast("Animal cadastrado com sucesso!");
    setTimeout(() => {
      this.voltaPagina()
    }, 1000);    
  }

  voltaPagina(){
    this.router.navigate([`ong-info/${this.ongSelecionadaID}`]);
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

  private async presentToast(mensage: string) {
    const toast = await this.toastController.create({
      message: mensage,
      duration: 4000,
      position: 'top'
    });
    toast.present();
  }

  ngOnInit() {
  }

}
