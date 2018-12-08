//MODULOS PADRÕES
import { NgModule     } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
//MODULOS PERSONALIZADOS
import { ComponenteGlobalModule } from './../global/componente-global.module';
//COMPONENTES PERSONALIZADOS
import { ProgramaComponent      } from './componentes/programa.component';

@NgModule({
  declarations: [
    ProgramaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    ComponenteGlobalModule
  ],
  exports: [
    ProgramaComponent
  ]
})
export class ProgramaModule { }
