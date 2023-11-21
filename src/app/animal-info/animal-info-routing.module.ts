import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnimalInfoPage } from './animal-info.page';

const routes: Routes = [
  {
    path: '',
    component: AnimalInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimalInfoPageRoutingModule {}
