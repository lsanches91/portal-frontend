import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AreaColaboradorPage } from './area-colaborador.page';

const routes: Routes = [
  {
    path: '',
    component: AreaColaboradorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreaColaboradorPageRoutingModule {}
