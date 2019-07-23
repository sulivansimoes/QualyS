// MODULOS PADRÕES
import { RouterModule } from '@angular/router';
import { NgModule     } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
// MÓDULOS DE TERCEIROS
import { NgxPaginationModule    } from 'ngx-pagination'; // Módulo da dependência de paginação

// MODULOS PERSONALIZADOS
import { ComponenteGlobalModule } from './../global/componente-global.module';
// COMPONENTES PERSONALIZADOS
import { LocalComponent         } from './componentes/local.component';
import { BrowserLocalComponent  } from './componentes/browser-local.component';
import { rotas                  } from '../global/rotas/rotas';

const appRoutes = rotas;

@NgModule({
  declarations: [
    LocalComponent,
    BrowserLocalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),

    NgxPaginationModule,

    ComponenteGlobalModule
  ],
  exports: [
    BrowserLocalComponent
  ]
})
export class LocalModule { }
