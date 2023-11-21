import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarColaboradorPage } from './listar-colaborador.page';

const routes: Routes = [
  {
    path: '',
    component: ListarColaboradorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarColaboradorPageRoutingModule {}
