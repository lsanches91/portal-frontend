import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarOngPage } from './editar-ong.page';

const routes: Routes = [
  {
    path: '',
    component: EditarOngPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarOngPageRoutingModule {}
