import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OngService } from '../api/ong.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public home!: string;
  private activatedRoute = inject(ActivatedRoute);

  public retorno:any = [];

  constructor( private ongService:OngService ) {
    this.getOngs();
  }


  getOngs(){
    this.ongService.getAll().then((ongs) => {
      this.retorno = ongs;
      console.log(ongs);
    }).catch((erro) => {
      console.log(erro)
    });
  }

  ngOnInit() {
    this.home = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

}
