import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlBase } from './utilidades.service';

@Injectable({
  providedIn: 'root'
})
export class DenunciaService {

  constructor(private http: HttpClient) {
  }

  async getAll(): Promise<any> {
    return this.http.get(`${urlBase}/denuncias`).toPromise();
  }

  async getAllDenunciasByUsuario(usuario_id: number): Promise<any> {
    return this.http.get(`${urlBase}/denunciasUsuario/${usuario_id}`).toPromise();
  }

  async getAllDenunciasByOng(ong_id: number): Promise<any> {
    return this.http.get(`${urlBase}/denunciasOng/${ong_id}`).toPromise();
  }

  async getDenunciaById(id: number) {
    return this.http.get(`${urlBase}/denuncia/${id}`).toPromise();
  }

  async create(denuncia: any) {
    return this.http.post(`${urlBase}/denuncia`, denuncia).toPromise();
  }

  update(ong_id: number, usuario_id: number, id:number, denuncia:any): Promise<any>{
    return this.http.put(`${urlBase}/denuncia/${ong_id}/${usuario_id}/${id}`, denuncia).toPromise();
  }

  delete(ong_id: number, usuario_id: number, id:number){
    return this.http.delete(`${urlBase}/denuncia/${ong_id}/${usuario_id}/${id}`).toPromise();
  }
}
