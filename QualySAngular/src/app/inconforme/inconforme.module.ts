//MODULOS PADROES
import { RouterModule } from '@angular/router';
import { NgModule     } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
import { ComponenteGlobalModule } from './../global/componente-global.module';
//MODULOS PERSONALILZADOS

//COMPONENTES PERSONALIZADOS
import { InconformeComponent        } from './componentes/inconforme.component';
import { BrowserInconformeComponent } from './componentes/browser-inconforme.component';
import { rotas                      } from '../global/rotas/rotas';

const appRoutes = rotas;
@NgModule({
  declarations: [
    InconformeComponent,
    BrowserInconformeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),

    ComponenteGlobalModule
  ],
  exports: [
    BrowserInconformeComponent
  ]
})
export class InconformeModule { }
