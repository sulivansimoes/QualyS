//MODULOS PADRÕES
import { RouterModule } from '@angular/router';
import { NgModule     } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
//MODULOS PERSONALIZADOS
import { ComponenteGlobalModule } from './../global/componente-global.module';
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

    ComponenteGlobalModule
  ],
  exports: [
    ProgramaComponent,
    BrowserProgramaComponent
  ]
})
export class ProgramaModule { }
