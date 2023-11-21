import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlBase } from './utilidades.service';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

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
    return this.http.get(`${urlBase}/animais`).toPromise();
  }

  getAllDisponiveis(): Promise<any> {
    return this.http.get(`${urlBase}/animaisDisponiveis`).toPromise();
  }

  getSingleAnimal(id:number): Promise<any> {
    return this.http.get(`${urlBase}/animal/${id}`).toPromise();
  }

  getAnimalByNomeERaca(nome:string, raca_id:any): Promise<any> {
    return this.http.get(`${urlBase}/animalNomeRaca/${nome}/${raca_id}`).toPromise();
  }

  update(id:number, animalData:any): Promise<any>{
    return this.http.put(`${urlBase}/animal/${id}`, animalData).toPromise();
  }

  create(animal:any){
    return this.http.post(`${urlBase}/animal`, animal).toPromise();
  }

  delete(id:number){
    return this.http.delete(`${urlBase}/animal/${id}`).toPromise();
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
