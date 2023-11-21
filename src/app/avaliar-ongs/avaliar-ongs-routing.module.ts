import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvaliarOngsPage } from './avaliar-ongs.page';

const routes: Routes = [
  {
    path: '',
    component: AvaliarOngsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvaliarOngsPageRoutingModule {}
