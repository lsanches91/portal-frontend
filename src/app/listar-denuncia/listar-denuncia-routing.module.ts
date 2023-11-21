import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarDenunciaPage } from './listar-denuncia.page';

const routes: Routes = [
  {
    path: '',
    component: ListarDenunciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarDenunciaPageRoutingModule {}
