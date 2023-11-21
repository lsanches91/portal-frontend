import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizarOngPageRoutingModule } from './visualizar-ong-routing.module';

import { VisualizarOngPage } from './visualizar-ong.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizarOngPageRoutingModule
  ],
  declarations: [VisualizarOngPage]
})
export class VisualizarOngPageModule {}
