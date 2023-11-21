import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { UtilsService, urlBase } from './utilidades.service';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private token = null;

  constructor(private http: HttpClient, private storage: StorageService, private utilidades: UtilsService) {
    this.init();
  }

  async init() {
    this.token = await this.storage.get("token");
  }

  async login(usuario: { email: string; senha: string; }): Promise<boolean> {
    if (usuario) {
      return this.http
        .post<boolean>(`${urlBase}/login`, usuario)
        .toPromise()
        .then((resultado: any) => {
          this.token = resultado.token;
          this.storage.set("token", this.token);
          return true;
        })
        .catch((error) => {
          this.token = null;
          this.utilidades.presentToastError(error.error.error)
          return false;
        });
    }
    return false;
  }

  getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token,
      }),
    };
    return httpOptions;
  }

  getHttpOptionsEnctype() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token,
        enctype: "application/x-www-form-urlencoded"
      }),
    };
    return httpOptions;
  }

  async logout() {
    this.token = null;
    //this.usuarioService.setUsuarioLogado(null);
    await this.storage.remove("token");
    await this.storage.remove("usuario");
  }

  async getToken() {
    await this.reloadIfTokenIsNull();
    return this.token;
  }

  async isLogado(): Promise<boolean> {
    var token = await this.getToken()
    return token ? true : false;
  }

  private async reloadIfTokenIsNull() {
    if (this.token == null || this.token == undefined)
      var token = await this.storage.get("token");
    this.token = token
    return this.token;
  }
}
