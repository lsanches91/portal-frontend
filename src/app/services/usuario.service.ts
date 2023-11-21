import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { AuthenticationService } from './authentication.service';
import { urlBase, UtilsService } from './utilidades.service';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private usuarioLogado: any;
  private token = null;

  constructor(private http: HttpClient, private storage: StorageService, private authentication: AuthenticationService, private utilsService: UtilsService) {
    this.init();
  }

  async init() {
    this.token = await this.storage.get("token");
  }

  async cadastrar(user: any) {
    return this.http
      .post<boolean>(`${urlBase}/usuario`, user)
      .toPromise()
      .then(() => {
        return true;
      })
      .catch((error: any) => {
        this.utilsService.presentToastError(error.error.error);
        return false;
      });
  }

  async ativar(token: string, usuario: any): Promise<any> {
    return this.http.put(`${urlBase}/ativar/${token}`, usuario).toPromise();
  }

  async redefinirSenha(token: string, usuario: any) {
    return this.http.put<boolean>(`${urlBase}/redefinir-senha/${token}`, usuario, this.getHttpOptions()).toPromise().then(() => {
      return true
    })
      .catch((error: any) => {
        this.utilsService.presentToastError(error.error.error);
        return false
      });
  }

  async enviarEmail(email: string) {
    return this.http.post<boolean>(`${urlBase}/enviar-email/${email}`, email).toPromise().then(() => {
      return true;
    })
      .catch((error: any) => {
        this.utilsService.presentToastError(error.error.error);
        return false;
      });;
  }

  getUsuarioPorId(id: number): Promise<any> {
    return this.http.get(`${urlBase}/usuario/${id}`).toPromise();
  }

  async setUsuarioLogado(usuario: any) {
    this.usuarioLogado = usuario;
    await this.storage.set("usuario", usuario);
  }

  async getUsuarioLogado() {
    this.usuarioLogado = await this.storage.get("usuario");
    return this.usuarioLogado;
  }

  async getUsuario() {
    await this.reloadIfTokenIsNull();
    return this.http.get(`${urlBase}/profile`, this.getHttpOptions()).toPromise().then(result => {
      this.usuarioLogado = result
      return result
    }).catch((err) => {
      this.authentication.logout();
      return false;
    });
  }

  private async reloadIfTokenIsNull() {
    if (this.token == null)
      this.token = await this.storage.get("token");
    return this.token;
  }

  private getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token,
      }),
    };
    return httpOptions;
  }

  getPendente(situacao: string) {
    return this.http.get(`${urlBase}/usuarios/${situacao}`).toPromise();
  }

  getToken() {
    return this.token;
  }

  getAll(): Promise<any> {
    return this.http.get(`${urlBase}/usuarios`).toPromise();
  }

  getSingleusuario(id: number) {
    return this.http.get(`${urlBase}/usuario/${id}`).toPromise();
  }

  getUsuarioByEmail(email: string) {
    return this.http.get(`${urlBase}/usuarioEmail/${email}`, this.getHttpOptions()).toPromise();
  }

  create(usuario: any) {
    return this.http.post(`${urlBase}/usuario`, usuario).toPromise();

  }

  delete(id: number) {
    return this.http.delete(`${urlBase}/usuario/${id}`).toPromise();
  }

  update(id: number, usuarioData: any): Promise<any> {
    return this.http.put(`${urlBase}/usuario/${id}`, usuarioData).toPromise();
  }

  haveAccess(): boolean {
    if (!this.usuarioLogado) {
      return false;
    } else if (this.usuarioLogado.nivel == "A") {
      return true;
    }
    return false;
  }

  enviaConvite(email: string) {
    return this.http.post(`${urlBase}/enviaConviteColaborador/${email}`, email).toPromise();
  }
}
