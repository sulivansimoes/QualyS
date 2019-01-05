//MODULOS PADRÕES
import { RouterModule } from '@angular/router';
import { NgModule     } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
//MODULOS PERSONALIZADOS
import { ComponenteGlobalModule } from './../global/componente-global.module';
//COMPONENTES PERSONALIZADOS
import { UsuarioComponent        } from './componentes/usuario.component';
import { BrowserUsuarioComponent } from './componentes/browser-usuario.component';
import { rotas                   } from '../global/rotas/rotas';

const appRoutes = rotas;

@NgModule({
  declarations: [
    UsuarioComponent,
    BrowserUsuarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),

    ComponenteGlobalModule
  ],
  exports: [
    UsuarioComponent,
    BrowserUsuarioComponent
  ]
})
export class UsuarioModule { }
