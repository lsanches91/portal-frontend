import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioAdocaoPageRoutingModule } from './formulario-adocao-routing.module';

import { FormularioAdocaoPage } from './formulario-adocao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormularioAdocaoPageRoutingModule
  ],
  declarations: [FormularioAdocaoPage]
})
export class FormularioAdocaoPageModule {}
