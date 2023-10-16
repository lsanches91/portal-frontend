import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OngService {

  private urlBase:string = 'https://backend-portal-y4f9.onrender.com';

  public retorno:any = {};

  constructor(private http:HttpClient) { 
    
  }

  getAll(): Promise<any> {
    return this.http.get(`${this.urlBase}/ongs`).toPromise();
  }

  getSingleOng(id:number){
    return this.http.get(`${this.urlBase}/ong/${id}`).toPromise();
  }

  create(ong:any){
    return this.http.post(`${this.urlBase}/ong`, ong).toPromise();

  }

  delete(id:number){
    return this.http.delete(`${this.urlBase}/ong/${id}`).toPromise();
  }

  update(id:number, ongData:any): Promise<any>{
    return this.http.put(`${this.urlBase}/ong/${id}`, ongData).toPromise();
  }

}
