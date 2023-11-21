import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarRacaPageRoutingModule } from './listar-raca-routing.module';

import { ListarRacaPage } from './listar-raca.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarRacaPageRoutingModule
  ],
  declarations: [ListarRacaPage]
})
export class ListarRacaPageModule {}
