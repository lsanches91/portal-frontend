import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaskitoModule } from '@maskito/angular';

import { IonicModule } from '@ionic/angular';

import { CadastroPageRoutingModule } from './cadastro-routing.module';

import { CadastroPage } from './cadastro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaskitoModule,
    CadastroPageRoutingModule
  ],
  declarations: [CadastroPage]
})
export class CadastroPageModule 
{
  

}
