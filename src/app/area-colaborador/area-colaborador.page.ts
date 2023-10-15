import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OngService } from '../api/ong.service';

@Component({
  selector: 'app-area-colaborador',
  templateUrl: './area-colaborador.page.html',
  styleUrls: ['./area-colaborador.page.scss'],
})
export class AreaColaboradorPage implements OnInit {

  public areaColaborador!: string;
  private activatedRoute = inject(ActivatedRoute);

  public retorno:any = [];

  constructor( private ongService:OngService, private router:Router) {
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

  acessarOng(id: number) {
    this.router.navigate(['/ong-info', id]);
  }


  ngOnInit() {
    this.areaColaborador = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

}
