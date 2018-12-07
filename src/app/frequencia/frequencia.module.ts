// MODULOS PADRÕES
import { NgModule     } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
// MODULOS PERSONALIZADOS
import { ComponenteGlobalModule } from './../global/componente-global.module';
// COMPONENTES PERSONALIZADOS
import { FrequenciaComponent    } from './componentes/frequencia.component';

@NgModule({
  declarations: [
    FrequenciaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,

    ComponenteGlobalModule
  ],
  exports: [
    FrequenciaComponent
  ]
})
export class FrequenciaModule { }
