import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlBase } from './utilidades.service';

@Injectable({
  providedIn: 'root'
})
export class ResgateService {

  constructor(private http: HttpClient) {

  }

  async getAll(): Promise<any> {
    return this.http.get(`${urlBase}/resgates`).toPromise();
  }

  async getAllResgatePendente(): Promise<any> {
    return this.http.get(`${urlBase}/resgatesPendete`).toPromise();
  }

  async getAllResgateByOng(ong_id: number): Promise<any> {
    return this.http.get(`${urlBase}/resgatesOng/${ong_id}`).toPromise();
  }

  async getAllResgateAceitoByOng(ong_id: number): Promise<any> {
    return this.http.get(`${urlBase}/resgatesAceitoOng/${ong_id}`).toPromise();
  }

  async getAllResgateFinalizadoByOng(ong_id: number): Promise<any> {
    return this.http.get(`${urlBase}/resgatesFinalizadoOng/${ong_id}`).toPromise();
  }

  async getResgateById(id: number, usuario_id: number) {
    return this.http.get(`${urlBase}/resgate/${usuario_id}/${id}`).toPromise();
  }

  async create(resgate: any) {
    return this.http.post(`${urlBase}/resgate`, resgate).toPromise();
  }

  update(id:number, usuario_id: number, resgateData:any): Promise<any>{
    return this.http.put(`${urlBase}/resgate/${usuario_id}/${id}`, resgateData).toPromise();
  }
}
