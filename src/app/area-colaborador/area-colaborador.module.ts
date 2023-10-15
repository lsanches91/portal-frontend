import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AreaColaboradorPageRoutingModule } from './area-colaborador-routing.module';

import { AreaColaboradorPage } from './area-colaborador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AreaColaboradorPageRoutingModule
  ],
  declarations: [AreaColaboradorPage]
})
export class AreaColaboradorPageModule {}
