import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { OngService } from '../api/ong.service';

@Component({
  selector: 'app-cadastrar-ong',
  templateUrl: './cadastrar-ong.page.html',
  styleUrls: ['./cadastrar-ong.page.scss'],
})
export class CadastrarOngPage{

  userID:number = 1;
  retorno!:any;

  novaOng = {
    nome_fantasia: "",
    cnpj: "",
    email: "",
    telefone: "",
    logradouro: "",
    numero: "",
    bairro: "",
    cep: "",
    uf: "",
    descricao: "",
    situacao: "",
    logo_path: "",
    usuario_id: 0
  }

  constructor(private route:ActivatedRoute, public toastController: ToastController, private ongService: OngService, private router:Router) {
    /* 'Não há necessidade no momento, precisa ter usuário logado'
    this.route.params.subscribe(params => {
      if (params['id']) {
        const id = +params['id'];
        this.userID = id;
      }
    });
    */
   }

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

  adicionar(ong: any){
    this.novaOng.usuario_id = this.userID;
    console.log(this.novaOng);
    if(this.camposValidos(ong)){
      this.ongService.create(this.novaOng)
      .then((retorno) => {
        console.log(this.retorno);
        this.retorno = retorno;
        this.presentToast("Ong adicionada com sucesso!");
      })
      .catch((erro) => {
        console.log(erro);
      });
    }
  }

  enviaOng(){
    this.adicionar(this.novaOng);
    setTimeout(() => {
      this.voltaPagina()
    }, 1000);    
  }

  voltaPagina(){
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

}
