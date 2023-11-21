import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlBase } from './utilidades.service';

@Injectable({
  providedIn: 'root'
})
export class OngService {

  public retorno:any = {};

  constructor(private http:HttpClient) { 
    
  }

  getOngBySituacao(situacao: string){
    return this.http.get(`${urlBase}/ongs/${situacao}`).toPromise();
  }

  getAll(): Promise<any> {
    return this.http.get(`${urlBase}/ongs`).toPromise();
  }

  getOngsByCity(city:string): Promise<any> {
    return this.http.get(`${urlBase}/ongsByCity/${city}`).toPromise();
  }

  getSingleOng(id:number){
    return this.http.get(`${urlBase}/ong/${id}`).toPromise();
  }

  create(ong:any){
    return this.http.post(`${urlBase}/ong`, ong).toPromise();
  }

  delete(id:number){
    return this.http.delete(`${urlBase}/ong/${id}`).toPromise();
  }

  update(id:number, ongData:any): Promise<any>{
    return this.http.put(`${urlBase}/ong/${id}`, ongData).toPromise();
  }

  async uploadArquivo(file: any) {
    return this.http
      .post<any>(`${urlBase}/uploads`, file)
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  }

}
