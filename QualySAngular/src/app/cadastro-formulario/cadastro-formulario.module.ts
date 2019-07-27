// MÓDULOS PADRÕES
import { RouterModule } from '@angular/router';
import { NgModule     } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
// MÓDULOS PERSONALIZADOS
import { ComponenteGlobalModule } from './../global/componente-global.module';
// MÓDULOS DE TERCEIROS
import { NgxPaginationModule    } from 'ngx-pagination'; // Módulo da dependência de paginação
// COMPONENTES PERSONALIZADOS
import { CadastroFormularioComponent        } from './componentes/cadastro-formulario.component';
import { BrowserCadastroFormularioComponent } from './componentes/browser-cadastro-formulario.component';
import { rotas                              } from '../global/rotas/rotas';

const appRoutes = rotas;

@NgModule({
  declarations: [
    CadastroFormularioComponent,
    BrowserCadastroFormularioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),

    NgxPaginationModule,

    ComponenteGlobalModule
  ],
  exports: [
    BrowserCadastroFormularioComponent
  ]
})
export class CadastroFormularioModule { }
