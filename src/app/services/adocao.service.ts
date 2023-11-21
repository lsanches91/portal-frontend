import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlBase } from './utilidades.service';

@Injectable({
  providedIn: 'root'
})
export class AdocaoService {

  constructor(private http: HttpClient) {

  }

  getAllAdocaoByOng(ong_id: number): Promise<any> {
    return this.http.get(`${urlBase}/adocoesByOng/${ong_id}`).toPromise();
  }

  getAllAdocaoByOngESituacao(ong_id: number, situacao:string): Promise<any> {
    return this.http.get(`${urlBase}/adocoesByOngESituacao/${ong_id}/${situacao}`).toPromise();
  }

  getAdocaoById(id:number, usuario_id:number, animal_id:number, ong_id: number): Promise<any> {
    return this.http.get(`${urlBase}/adocao/${id}/${usuario_id}/${animal_id}/${ong_id}`).toPromise();
  }

  update(id:number, usuario_id:number, animal_id:number, ong_id: number, adocao:any): Promise<any> {
    return this.http.put(`${urlBase}/adocao/${id}/${usuario_id}/${animal_id}/${ong_id}`, adocao).toPromise();
  }

}
