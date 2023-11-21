import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarColaboradorPage } from './editar-colaborador.page';

const routes: Routes = [
  {
    path: '',
    component: EditarColaboradorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarColaboradorPageRoutingModule {}
