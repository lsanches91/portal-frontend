import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarColaboradorPageRoutingModule } from './editar-colaborador-routing.module';

import { EditarColaboradorPage } from './editar-colaborador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarColaboradorPageRoutingModule
  ],
  declarations: [EditarColaboradorPage]
})
export class EditarColaboradorPageModule {}
