import { UsuarioService } from '../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ativar',
  templateUrl: './ativar.page.html',
  styleUrls: ['./ativar.page.scss'],
})
export class AtivarPage implements OnInit {

  constructor(private route:ActivatedRoute, private usuarioService: UsuarioService) {
    this.route.params.subscribe(params => {
      if (params['token']) {
        const token = params['token'];       
        const usuario = usuarioService.ativar(token, null);
      }
    });
   }

  ngOnInit() {

  }

}
