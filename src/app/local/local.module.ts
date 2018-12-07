// MODULOS PADRÕES
import { NgModule     } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
// MODULOS PERSONALIZADOS
import { ComponenteGlobalModule } from './../global/componente-global.module';
// COMPONENTES PERSONALIZADOS
import { LocalComponent } from './componentes/local.component';

@NgModule({
  declarations: [
    LocalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,

    ComponenteGlobalModule
  ],
  exports: [
    LocalComponent
  ]
})
export class LocalModule { }
