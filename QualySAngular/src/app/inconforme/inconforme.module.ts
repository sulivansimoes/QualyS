//MODULOS PADROES
import { RouterModule     } from '@angular/router';
import { NgModule         } from '@angular/core';
import { CommonModule     } from '@angular/common';
import { FormsModule      } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// MÓDULOS DE TERCEIROS
import { NgxPaginationModule    } from 'ngx-pagination'; // Módulo da dependência de paginação
//MODULOS PERSONALILZADOS
import { ComponenteGlobalModule } from './../global/componente-global.module';

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
    HttpClientModule,

    NgxPaginationModule,

    ComponenteGlobalModule
  ],
  exports: [
    BrowserInconformeComponent
  ]
})
export class InconformeModule { }
