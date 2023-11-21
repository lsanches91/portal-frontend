import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OngsPage } from './ongs.page';

const routes: Routes = [
  {
    path: '',
    component: OngsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OngsPageRoutingModule {}
