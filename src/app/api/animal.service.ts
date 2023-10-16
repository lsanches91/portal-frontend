import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private urlBase:string = 'http://localhost:3333';

  public retorno:any = {};

  constructor(private http:HttpClient) { 
    
  }

  getAll(): Promise<any> {
    return this.http.get(`${this.urlBase}/animais`).toPromise();
  }

  getSingleAnimal(id:number): Promise<any> {
    return this.http.get(`${this.urlBase}/animal/${id}`).toPromise();
  }

  update(id:number, animalData:any): Promise<any>{
    return this.http.put(`${this.urlBase}/animal/${id}`, animalData).toPromise();
  }

  create(animal:any){
    return this.http.post(`${this.urlBase}/animal`, animal).toPromise();
  }

  delete(id:number){
    return this.http.delete(`${this.urlBase}/animal/${id}`).toPromise();
  }

}
