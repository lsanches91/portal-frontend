import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarDenunciaPageRoutingModule } from './listar-denuncia-routing.module';

import { ListarDenunciaPage } from './listar-denuncia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarDenunciaPageRoutingModule
  ],
  declarations: [ListarDenunciaPage]
})
export class ListarDenunciaPageModule {}
