import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriaAnimalPageRoutingModule } from './cria-animal-routing.module';

import { CriaAnimalPage } from './cria-animal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriaAnimalPageRoutingModule
  ],
  declarations: [CriaAnimalPage]
})
export class CriaAnimalPageModule {}
