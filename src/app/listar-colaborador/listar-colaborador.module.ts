import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarColaboradorPageRoutingModule } from './listar-colaborador-routing.module';

import { ListarColaboradorPage } from './listar-colaborador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarColaboradorPageRoutingModule
  ],
  declarations: [ListarColaboradorPage]
})
export class ListarColaboradorPageModule {}
