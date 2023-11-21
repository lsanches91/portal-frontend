import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlBase } from './utilidades.service';

@Injectable({
  providedIn: 'root'
})
export class EspecieService {

  public retorno:any = {};

  constructor(private http:HttpClient) { 

  }

  getAll(): Promise<any> {
    return this.http.get(`${urlBase}/especies`).toPromise();
  }

  getSingleEspecie(id:number): Promise<any> {
    return this.http.get(`${urlBase}/especie/${id}`).toPromise();
  }

  getEspecieByNomeCietifico(nome_cientifico:string): Promise<any> {
    return this.http.get(`${urlBase}/especie/nomeCientifico/${nome_cientifico}`).toPromise();
  }

  getEspecieByNomeComum(nome_comum:string): Promise<any> {
    return this.http.get(`${urlBase}/especie/nomeComum/${nome_comum}`).toPromise();
  }

  getEspecieBySituacao(situacao:string): Promise<any> {
    return this.http.get(`${urlBase}/especie/situacao/${situacao}`).toPromise();
  }

  update(id:number, especieData:any): Promise<any>{
    return this.http.put(`${urlBase}/especie/${id}`, especieData).toPromise();
  }

  create(especie:any){
    return this.http.post(`${urlBase}/especie`, especie).toPromise();
  }

  delete(id:number){
    return this.http.delete(`${urlBase}/especie/${id}`).toPromise();
  }
}
