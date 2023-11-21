import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { StorageService } from './storage.service';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthorizationService implements CanActivate {
  constructor(
    private authentication: AuthenticationService,
    private router: Router,
    private storage: StorageService
  ) {}

  async canActivate() : Promise<boolean> {
    var token = await this.storage.get("token");
    var isLogado = token ? true : (await this.authentication.isLogado())
    if (!isLogado) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AdministratorAuthorizationService implements CanActivate {

  constructor(
    private authentication: UsuarioService,
    private router: Router,
    private storage: StorageService
  ) {}

  async canActivate() {
    var user = await this.storage.get("usuario");
    var haveAccess = user ? (user.nivel == "A" ? true : false) : this.authentication.haveAccess();
    if (!haveAccess) {
      if(!user){
        this.router.navigate(['/login']);
      }else{
        this.router.navigate(['/home']);
      }
      return false;
    }
    return true;
  }
}