import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AtivarPageRoutingModule } from './ativar-routing.module';

import { AtivarPage } from './ativar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AtivarPageRoutingModule
  ],
  declarations: [AtivarPage]
})
export class AtivarPageModule {}
