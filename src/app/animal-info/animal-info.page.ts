import { ActivatedRoute } from '@angular/router';
import { AnimalService } from './../services/animal.service';
import { Component, OnInit } from '@angular/core';
import { UtilsService, urlBase } from '../services/utilidades.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-animal-info',
  templateUrl: './animal-info.page.html',
  styleUrls: ['./animal-info.page.scss'],
})
export class AnimalInfoPage implements OnInit {

  animal:any = {
    ong:{
      cidade:{
        estado:{
          
        }
      }
    }
  }
  urlFoto:string = ""
  raca:string = ""
  especie:string = ""
  isTelaPequena:boolean = false; 

  constructor(private animalService: AnimalService, private route: ActivatedRoute, private router:Router, 
    private usuarioService:UsuarioService, private utilsService: UtilsService) { 
    this.route.params.subscribe(params => {
      if (params['id']) {
        const id = +params['id'];
        this.getSingleAnimal(id);
      }
    });
  }

  getSingleAnimal(id:number){
    this.animalService.getSingleAnimal(id).then((animal) => {
      this.animal = animal;
      this.urlFoto = urlBase+"/uploads/"+animal.foto_path;
      this.raca = animal.raca.nome;
      this.especie = animal.raca.especie.nome_comum;
    }).catch((erro) => {
      console.log(erro)
    });
  }

  ngOnInit() {
    
  }

  async adocaoAnimal(id:number) {
    const usuario = await this.usuarioService.getUsuarioLogado();
    if(usuario)
      this.router.navigate(['/formulario-adocao/', id]);
    else
      this.utilsService.presentToastWarning("Realize o login para solicitar a adoção do animal")
  }

}
