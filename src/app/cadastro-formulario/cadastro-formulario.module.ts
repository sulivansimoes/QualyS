// MÓDULOS PADRÕES
import { NgModule     } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
// MÓDULOS PERSONALIZADOS
import { ComponenteGlobalModule } from './../global/componente-global.module';
// COMPONENTES PERSONALIZADOS
import { CadastroFormularioComponent } from './componentes/cadastro-formulario.component';

@NgModule({
  declarations: [
    CadastroFormularioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    ComponenteGlobalModule
  ],
  exports: [
    CadastroFormularioComponent
  ]
})
export class CadastroFormularioModule { }
