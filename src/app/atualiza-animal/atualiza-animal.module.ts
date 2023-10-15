import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AtualizaAnimalPageRoutingModule } from './atualiza-animal-routing.module';

import { AtualizaAnimalPage } from './atualiza-animal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AtualizaAnimalPageRoutingModule
  ],
  declarations: [AtualizaAnimalPage]
})
export class AtualizaAnimalPageModule {}
