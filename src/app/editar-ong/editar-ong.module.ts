import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarOngPageRoutingModule } from './editar-ong-routing.module';

import { EditarOngPage } from './editar-ong.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarOngPageRoutingModule
  ],
  declarations: [EditarOngPage]
})
export class EditarOngPageModule {}
