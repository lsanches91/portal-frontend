import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarEspeciePageRoutingModule } from './listar-especie-routing.module';

import { ListarEspeciePage } from './listar-especie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarEspeciePageRoutingModule
  ],
  declarations: [ListarEspeciePage]
})
export class ListarEspeciePageModule {}
