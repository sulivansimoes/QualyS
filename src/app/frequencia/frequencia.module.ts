// MODULOS PADRÕES
import { NgModule     } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
// MODULOS PERSONALIZADOS
import { ComponenteGlobalModule } from './../global/componente-global.module';
// COMPONENTES PERSONALIZADOS
import { FrequenciaComponent    } from './componentes/frequencia.component';
import { BrowserFrequenciaComponent } from './componentes/browser-frequencia.component';

@NgModule({
  declarations: [
    FrequenciaComponent,
    BrowserFrequenciaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,

    ComponenteGlobalModule
  ],
  exports: [
    FrequenciaComponent,
    BrowserFrequenciaComponent
  ]
})
export class FrequenciaModule { }
