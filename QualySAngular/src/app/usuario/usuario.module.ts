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
import { UsuarioComponent        } from './componentes/usuario.component';
import { LoginComponent          } from './componentes/login.component';
import { BrowserUsuarioComponent } from './componentes/browser-usuario.component';
import { rotas                   } from '../global/rotas/rotas';

const appRoutes = rotas;

@NgModule({
  declarations: [
    LoginComponent,
    UsuarioComponent,
    BrowserUsuarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),

    NgxPaginationModule,

    ComponenteGlobalModule
  ],
  exports: [
    LoginComponent,
    BrowserUsuarioComponent
  ]
})
export class UsuarioModule { }
