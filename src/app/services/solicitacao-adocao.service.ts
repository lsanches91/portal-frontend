import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlBase } from './utilidades.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoAdocaoService {

  public retorno:any = {};

  constructor(private http:HttpClient) { 
    
  }

  private getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content Type': 'multipart/form-data'
        
      }),
    };
    return httpOptions;
  }

  getAll(): Promise<any> {
    return this.http.get(`${urlBase}/adocoes`).toPromise();
  }

  async create(adocao:any){
    return this.http.post(`${urlBase}/adocao`, adocao).toPromise();
  }
}
