import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarOngPage } from './listar-ong.page';

const routes: Routes = [
  {
    path: '',
    component: ListarOngPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarOngPageRoutingModule {}
