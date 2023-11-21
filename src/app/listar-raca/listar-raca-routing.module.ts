import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarRacaPage } from './listar-raca.page';

const routes: Routes = [
  {
    path: '',
    component: ListarRacaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarRacaPageRoutingModule {}
