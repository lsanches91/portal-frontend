import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarEspeciePage } from './listar-especie.page';

const routes: Routes = [
  {
    path: '',
    component: ListarEspeciePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarEspeciePageRoutingModule {}
