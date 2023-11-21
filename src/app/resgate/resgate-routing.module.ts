import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResgatePage } from './resgate.page';

const routes: Routes = [
  {
    path: '',
    component: ResgatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResgatePageRoutingModule {}
