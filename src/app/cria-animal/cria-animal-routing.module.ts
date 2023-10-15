import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriaAnimalPage } from './cria-animal.page';

const routes: Routes = [
  {
    path: '',
    component: CriaAnimalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriaAnimalPageRoutingModule {}
