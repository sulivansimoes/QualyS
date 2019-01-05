import { RouterModule } from '@angular/router';
// MODULOS PADRÕES
import { NgModule     } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
// MODULOS PERSONALIZADOS

// COMPONENTES PERSONALIZADOS
import { FrequenciaComponent    } from './componentes/frequencia.component';
import { ComponenteGlobalModule } from './../global/componente-global.module';
import { rotas                  } from '../global/rotas/rotas';
import { BrowserFrequenciaComponent } from './componentes/browser-frequencia.component';

const appRoutes = rotas;

@NgModule({
  declarations: [
    FrequenciaComponent,
    BrowserFrequenciaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),

    ComponenteGlobalModule
  ],
  exports: [
    BrowserFrequenciaComponent
  ]
})
export class FrequenciaModule { }
