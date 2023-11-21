import { UsuarioService } from '../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';
import { UtilsService } from '../services/utilidades.service';
import { CidadeService } from '../services/cidade.service';
import { EstadoService } from '../services/estado.service';
import { GeolocalizacaoService } from '../services/geolocalizacao.service';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.page.html',
  styleUrls: ['./cadastrar-usuario.page.scss'],
})
export class CadastrarUsuarioPage implements OnInit {

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
  nivel: string = "C";
  situacao: string = "A";

  estados: any = []
  cidades: any = []

  estadoSelecionado:string = ""

  cidadeSelecionada:string = ""
  cidadeSelecionada_id = ""

  selectDisabled: boolean = true;

  constructor(private utilsService: UtilsService,
    private usuarioService: UsuarioService, private estadoService: EstadoService,
    private cidadeService: CidadeService, private geolocalizacaoService: GeolocalizacaoService) {
    this.estadoService.getAll().then((retorno) => {
      this.estados = retorno
    }).catch((erro) => {
      console.log(erro);
    });
  }
  readonly cpfMask: MaskitoOptions = {
    mask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
  };

  readonly telMask: MaskitoOptions = {
    mask: ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  };

  readonly cepMask: MaskitoOptions = {
    mask: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  };

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

  ngOnInit() {
  }

  async cadastrar() {
    if (
      this.nome == "" ||
      this.cpf == "" ||
      this.celular == "" ||
      this.email == "" ||
      this.senha == "" ||
      this.confirmaSenha == "" ||
      this.cep == "" ||
      this.logradouro == "" ||
      this.bairro == "" ||
      this.numero == "" ||
      this.estadoSelecionado == "" ||
      this.cidadeSelecionada == ""
    ) {
      console.log(this.nome, this.cpf, this.celular, this.email, this.senha, this.confirmaSenha, this.cep, this.logradouro, this.bairro, this.numero, this.cidadeSelecionada, this.estadoSelecionado)
      this.utilsService.presentToastWarning("Preencha todos os campos")
    } else if (!this.validarCPF(this.cpf)) {
      this.utilsService.presentToastWarning("O CPF inserido é inválido")
    } else if (!this.validarEmail(this.email)) {
      this.utilsService.presentToastWarning("O E-mail inserido é inválido")
    } else if (this.senha != this.confirmaSenha){
      this.utilsService.presentToastWarning("As senhas estão divergentes")
    }else {
      var usuario = {
        nome: this.nome,
        cpf: this.cpf,
        telefone: this.celular,
        logradouro: this.logradouro,
        numero: this.numero,
        bairro: this.bairro,
        cidade_id: parseInt(this.cidadeSelecionada_id),
        cep: this.cep,
        email: this.email,
        senha: this.senha,
        nivel: this.nivel,
        imagem_path: null,
        situacao: this.situacao
      };

      const res = await this.usuarioService.cadastrar(usuario);
      if (res) {
        this.utilsService.presentToastSuccess("Usuário cadastrado com sucesso!");
        window.location.href = "/listar-usuario";
      }
    }
  }

  async verificaEstados() {
    if (this.estados.length == 0) {
      await this.estadoService.importEstados()
      await this.cidadeService.importCidades()
      this.estadoService.getAll().then((retorno) => {
        this.estados = retorno
      }).catch((erro) => {
        console.log(erro);
      });
    }
  }
  async buscarEndereco() {
    if (this.cep == "") {
      this.utilsService.presentToastWarning("Preencha o CEP")
    } else {
      let CEP = parseInt(this.cep.replace(/\D/g, ''))
      await this.geolocalizacaoService.getAddresByCEP(CEP).then(async (retorno: any) => {
        this.logradouro = retorno.logradouro
        this.bairro = retorno.bairro
        await this.cidadeService.getCidadeByNome(retorno.uf, retorno.localidade).then((cidade: any) => {
          this.cidadeSelecionada = cidade.nome
          this.cidadeSelecionada_id = cidade.id
          this.estadoSelecionado = cidade.estado_sigla
          this.selectDisabled = false
        })
      })
    }
  }

  onEstadoChange(event: any) {
    const sigla = event.detail.value
    this.cidadeService.getCidadeByEstado(sigla).then((retorno) => {
      this.cidades = retorno || {}
      this.cidadeSelecionada = ""
      this.selectDisabled = false
    }).catch((erro) => {
      console.log(erro);
    })
  }

  validarCPF(cpf: string): boolean {
    // Remover caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');

    // Verificar se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
      return false;
    }

    // Verificar se todos os dígitos são iguais, o que tornaria o CPF inválido
    if (/^(\d)\1{10}$/.test(cpf)) {
      return false;
    }

    // Calcular o primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = soma % 11;
    let digitoVerificador1 = resto < 2 ? 0 : 11 - resto;

    // Verificar se o primeiro dígito verificador está correto
    if (digitoVerificador1 !== parseInt(cpf.charAt(9))) {
      return false;
    }

    // Calcular o segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = soma % 11;
    let digitoVerificador2 = resto < 2 ? 0 : 11 - resto;

    // Verificar se o segundo dígito verificador está correto
    if (digitoVerificador2 !== parseInt(cpf.charAt(10))) {
      return false;
    }

    // Se todas as verificações passaram, o CPF é válido
    return true;
  }

  validarEmail(email: string): boolean {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  }

  onCidadeChange(event: any) {
    const id = event.detail.value
    this.cidadeService.getCidadeById(id).then((cidade:any)=>{
      this.cidadeSelecionada = cidade.nome
      console.log(this.cidadeSelecionada)
    }).catch((error:any) => {
      this.utilsService.presentToastError(error.error.error);
    });
  }

}
