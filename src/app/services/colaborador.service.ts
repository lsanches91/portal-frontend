import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlBase } from './utilidades.service';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  constructor(private http: HttpClient) { }

  create(colaborador:any){
    return this.http.post(`${urlBase}/colaborador`, colaborador).toPromise();
  }  

  update(ong_id:number, usuario_id:any, colaborador:any){
    return this.http.put(`${urlBase}/colaborador/${ong_id}/${usuario_id}`, colaborador).toPromise();
  }

  getAll(): Promise<any> {
    return this.http.get(`${urlBase}/colaboradores`).toPromise();
  }
  
  getAllOngsByUsuario(id:number): Promise<any> {
    return this.http.get(`${urlBase}/colaboradoresUsuario/${id}`).toPromise();
  }

  getAllUsuarioByOng(id:number): Promise<any> {
    return this.http.get(`${urlBase}/colaboradoresOng/${id}`).toPromise();
  }

  getSingleColaborador(ong_id:number, usuario_id:number): Promise<any> {
    return this.http.get(`${urlBase}/colaborador/${ong_id}/${usuario_id}`).toPromise();
  }
}
