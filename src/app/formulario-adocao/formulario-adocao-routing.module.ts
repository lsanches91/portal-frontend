import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioAdocaoPage } from './formulario-adocao.page';

const routes: Routes = [
  {
    path: '',
    component: FormularioAdocaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormularioAdocaoPageRoutingModule {}
