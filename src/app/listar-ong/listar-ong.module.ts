import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarOngPageRoutingModule } from './listar-ong-routing.module';

import { ListarOngPage } from './listar-ong.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarOngPageRoutingModule
  ],
  declarations: [ListarOngPage]
})
export class ListarOngPageModule {}
