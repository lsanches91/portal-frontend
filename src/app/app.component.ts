import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Minha Conta', url: '/login', icon: 'person' },
    { title: 'Área do Colaborador', url: '/area-colaborador', icon: 'business' },
    { title: 'ONGs', url: '/listar-ong', icon: 'archive' },
  ];
  constructor() {}
}
