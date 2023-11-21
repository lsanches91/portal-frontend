import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilsService } from './utilidades.service';

@Injectable({
  providedIn: 'root'
})
export class GeolocalizacaoService {

  public retorno:any = {};

  constructor(private http:HttpClient, private utilsService:UtilsService) { 
    
  }

  async getAddres(latitude:number, longitude:number){
    return this.http.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=e1c1fc95d3934d288f9fbadedeed9d1b`).toPromise();
  }

  async getAddresByCEP(cep:number){
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/ `).toPromise()
  }
}
