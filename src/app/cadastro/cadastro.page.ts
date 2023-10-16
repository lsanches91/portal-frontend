import { UsuarioService } from './../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})

export class CadastroPage implements OnInit {

  nome: string = "";
  cpf: string = "";
  celular: string = "";
  email: string = "";
  senha: string = "";
  confirmaSenha: string = "";
  cep: string = "";
  logradouro: string = "";
  bairro: string = "";
  numero: string = "";
  cidade: string = "";
  uf: string = "";
  nivel: string = "C";
  situacao: string = "P";

  constructor(private toastController: ToastController, private usuarioService: UsuarioService) { }

  readonly cpfMask: MaskitoOptions = {
    mask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
  };

  readonly telMask: MaskitoOptions = {
    mask: ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  };

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

  ngOnInit() {
  }

  async presentToast(mensagem:string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1500,
      position: 'top',
    });

    await toast.present();
  }

  async cadastrar(){
      if (this.nome == "" || this.cpf == "" || this.email == "" || this.email == "" || this.senha == "") {
        this.presentToast("Preencha os campos obrigatórios");
      } else {
        if(this.senha != this.confirmaSenha){
          this.presentToast("As senhas estão divergentes");
        } else {
          var usuario = {
            nome: this.nome,
            cpf: this.cpf,
            telefone: this.celular,
            logradouro: this.logradouro,
            numero: this.numero,
            bairro: this.bairro,
            cidade: this.cidade,
            cep: this.cep,
            uf: this.uf,
            email: this.email,
            senha: this.senha,
            nivel: this.nivel,
            imagem_path: null,
            situacao: this.situacao
          };
          
          var result = await this.usuarioService.cadastrar(usuario);

          if(result){
            this.presentToast("Aluno cadastrado com sucesso!");
          }          
        }
      }
    }
  }
