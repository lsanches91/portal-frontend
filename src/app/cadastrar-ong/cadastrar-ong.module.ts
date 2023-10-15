import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastrarOngPageRoutingModule } from './cadastrar-ong-routing.module';

import { CadastrarOngPage } from './cadastrar-ong.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastrarOngPageRoutingModule
  ],
  declarations: [CadastrarOngPage]
})
export class CadastrarOngPageModule {}
