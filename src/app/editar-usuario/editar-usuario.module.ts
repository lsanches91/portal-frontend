import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaskitoModule } from '@maskito/angular';
import { IonicModule } from '@ionic/angular';
import { EditarUsuarioPageRoutingModule } from './editar-usuario-routing.module';
import { EditarUsuarioPage } from './editar-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaskitoModule,
    EditarUsuarioPageRoutingModule
  ],
  declarations: [EditarUsuarioPage]
})
export class EditarUsuarioPageModule {}
