import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlBase } from './utilidades.service';

@Injectable({
  providedIn: 'root'
})
export class RacaService {
  public retorno:any = {};

  constructor(private http:HttpClient) { 

  }

  getAll(): Promise<any> {
    return this.http.get(`${urlBase}/racas`).toPromise();
  }

  getSingleRaca(id:number): Promise<any> {
    return this.http.get(`${urlBase}/raca/${id}`).toPromise();
  }

  getSingleRacaByEspecieENome(nome:string, especie_id:number): Promise<any> {
    return this.http.get(`${urlBase}/racaEspecieNome/${nome}/${especie_id}`).toPromise();
  }

  getRacaByEspecie(especieId:number): Promise<any> {
    return this.http.get(`${urlBase}/racaEspecie/${especieId}`).toPromise();
  }

  getRacaByEspecieESituacao(especieId:number, situacao:string): Promise<any> {
    return this.http.get(`${urlBase}/racaEspecieSituacao/${especieId}/${situacao}`).toPromise();
  }

  getRacaBySituacao(situacao:string): Promise<any> {
    return this.http.get(`${urlBase}/raca/situacao/${situacao}`).toPromise();
  }

  update(id:number, racaData:any): Promise<any>{
    return this.http.put(`${urlBase}/raca/${id}`, racaData).toPromise();
  }

  create(raca:any){
    return this.http.post(`${urlBase}/raca`, raca).toPromise();
  }

  delete(id:number){
    return this.http.delete(`${urlBase}/raca/${id}`).toPromise();
  }
}
