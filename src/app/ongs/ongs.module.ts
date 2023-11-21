import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OngsPageRoutingModule } from './ongs-routing.module';

import { OngsPage } from './ongs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OngsPageRoutingModule
  ],
  declarations: [OngsPage]
})
export class OngsPageModule {}
