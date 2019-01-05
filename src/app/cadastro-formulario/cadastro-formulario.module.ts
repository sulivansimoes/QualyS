// MÓDULOS PADRÕES
import { RouterModule } from '@angular/router';
import { NgModule     } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
// MÓDULOS PERSONALIZADOS
import { ComponenteGlobalModule } from './../global/componente-global.module';
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

    ComponenteGlobalModule
  ],
  exports: [
    CadastroFormularioComponent,
    BrowserCadastroFormularioComponent
  ]
})
export class CadastroFormularioModule { }
