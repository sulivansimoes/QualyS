// MODULOS PADRÕES
import { NgModule         } from '@angular/core';
import { CommonModule     } from '@angular/common';
import { FormsModule      } from '@angular/forms';
import { RouterModule     } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
// MÓDULOS DE TERCEIROS
import { NgxPaginationModule    } from 'ngx-pagination'; // Módulo da dependência de paginação

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
    HttpClientModule,

    NgxPaginationModule,

    ComponenteGlobalModule
  ],
  exports: [
    BrowserFrequenciaComponent
  ]
})
export class FrequenciaModule { }
