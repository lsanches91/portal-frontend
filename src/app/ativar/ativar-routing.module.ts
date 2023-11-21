import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtivarPage } from './ativar.page';

const routes: Routes = [
  {
    path: '',
    component: AtivarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtivarPageRoutingModule {}
