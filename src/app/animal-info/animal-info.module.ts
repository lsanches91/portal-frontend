import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnimalInfoPageRoutingModule } from './animal-info-routing.module';

import { AnimalInfoPage } from './animal-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnimalInfoPageRoutingModule
  ],
  declarations: [AnimalInfoPage]
})
export class AnimalInfoPageModule {}
