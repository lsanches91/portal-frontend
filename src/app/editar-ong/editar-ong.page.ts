import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { OngService } from '../api/ong.service';

@Component({
  selector: 'app-editar-ong',
  templateUrl: './editar-ong.page.html',
  styleUrls: ['./editar-ong.page.scss'],
})
export class EditarOngPage implements OnInit {

  ongSelecionada:any = {};
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
    situacao: ""
  }

  constructor(private route:ActivatedRoute, public toastController: ToastController, private ongService: OngService, private router:Router) { 
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
      this.novaOng = this.ongSelecionada;
    }).catch((erro) => {
      console.log(erro);
    })
  }

  putOng(ong:any){
    if(this.camposValidos(ong)){
      this.ongService.update(this.ongSelecionada.id, this.novaOng).then((ong) => {
        this.retorno = ong;
        console.log(this.retorno);
        this.presentToast("ONG editada com sucesso!");
      }).catch((erro) => {
        console.log(erro);
      })
    }
  }

  enviaOng(){
    this.putOng(this.novaOng);
    setTimeout(() => {
      this.voltaPagina();
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
