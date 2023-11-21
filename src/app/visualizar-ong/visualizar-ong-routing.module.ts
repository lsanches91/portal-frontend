import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizarOngPage } from './visualizar-ong.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizarOngPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisualizarOngPageRoutingModule {}
