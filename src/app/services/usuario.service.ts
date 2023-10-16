import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private userLog: any;
  //  private token: string = null;
  
    constructor(private http: HttpClient, private storage: StorageService) {
      this.init();
     }
  
    async init() {
  //    this.token = await this.storage.get("token");
    }
  
    async cadastrar(user: any) {
      return this.http
        .post<boolean>('https://backend-portal-y4f9.onrender.com/usuario', user)
        .toPromise()
        .then(() => {
          return true;
        })
        .catch((err) => {
          return false;
        });
    }

    async login(email:string, senha:string) {
      var credenciais = {email: email, senha:senha}
      return this.http
        .post<boolean>('https://backend-portal-y4f9.onrender.com/login', credenciais)
        .toPromise()
        .then(() => {
          return true;
        })
        .catch((err) => {
          return false;
        });
    }
}
