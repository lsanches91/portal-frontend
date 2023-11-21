import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvaliarOngsPageRoutingModule } from './avaliar-ongs-routing.module';

import { AvaliarOngsPage } from './avaliar-ongs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvaliarOngsPageRoutingModule
  ],
  declarations: [AvaliarOngsPage]
})
export class AvaliarOngsPageModule {}
