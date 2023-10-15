import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastrarOngPage } from './cadastrar-ong.page';

const routes: Routes = [
  {
    path: '',
    component: CadastrarOngPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastrarOngPageRoutingModule {}
