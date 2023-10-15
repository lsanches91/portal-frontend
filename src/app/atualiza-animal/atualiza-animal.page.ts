import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../api/animal.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-atualiza-animal',
  templateUrl: './atualiza-animal.page.html',
  styleUrls: ['./atualiza-animal.page.scss'],
})
export class AtualizaAnimalPage implements OnInit {

  animalSelecionado:any = {}
  retorno!:any;

  novoAnimal = {
    nome: "",
    especie: "",
    idade: "",
    porte: "",
    raca: "",
    descricao: "",
    situacao: ""
  }

  constructor(private route:ActivatedRoute, public toastController: ToastController, private animalService:AnimalService, private router:Router) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        const id = +params['id'];
        this.getSingleAnimal(id);        
      }
    });
  }

  getSingleAnimal(id:number){
    this.animalService.getSingleAnimal(id).then((animal) =>  {
      this.animalSelecionado = animal;
      this.novoAnimal = this.animalSelecionado;
    }).catch((erro) => {
      console.log(erro);
    })
  }

  putAnimal(animal:any){
    if(this.camposValidos(animal)){
      this.animalService.update(this.animalSelecionado.id, this.novoAnimal).then((animal) => {
        this.retorno = animal;
        console.log(this.retorno);
        this.presentToast("Animal atualizado com sucesso!");
      }).catch((erro) => {
        console.log(erro);
      })
    }
  }

  enviaAnimal(){
    this.putAnimal(this.novoAnimal);
    setTimeout(() => {
      this.voltaPagina();
    }, 1000);    
  }

  voltaPagina(){
    this.router.navigate([`ong-info/${this.animalSelecionado.ong_id}`]);
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
