import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlBase } from './utilidades.service';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor(private http: HttpClient) { }

  async importEstados(){
    const estados_api = this.http.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados").toPromise();

    estados_api.then((estados: any) => {
      estados.forEach((estado: any) => {
        const novo_estado:any = {
          nome: estado.nome,
          sigla: estado.sigla
        }
        this.http.post(`${urlBase}/estado`, novo_estado).toPromise().then((res) =>{ console.log("Estado criado:" + res) } );
      });
    }).catch((error: any) => {
      console.error('Erro ao obter estados', error);
    });
  }

  getAll(): Promise<any> {
    return this.http.get(`${urlBase}/estados`).toPromise();
  }
}
