//MODULOS PADRÕES
import { RouterModule } from '@angular/router';
import { NgModule     } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
//MODULOS PERSONALIZADOS
import { ComponenteGlobalModule } from './../global/componente-global.module';

// MÓDULOS DE TERCEIROS
import { NgxPaginationModule    } from 'ngx-pagination'; // Módulo da dependência de paginação

//COMPONENTES PERSONALIZADOS
import { ProgramaComponent        } from './componentes/programa.component';
import { BrowserProgramaComponent } from './componentes/browser-programa.component';
import { rotas                    } from '../global/rotas/rotas';

const appRoutes = rotas;

@NgModule({
  declarations: [
    ProgramaComponent,
    BrowserProgramaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),

    NgxPaginationModule,

    ComponenteGlobalModule
  ],
  exports: [
    BrowserProgramaComponent
  ]
})
export class ProgramaModule { }
