// MODULOS PADROES
import { NgModule     } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
// MODULOS PERSONALIZADOS
import { ComponenteGlobalModule       } from './../global/componente-global.module';
// COMPONENTES PERSONALIZADOS
import { RespostaFormularioComponent  } from './componentes/resposta-formulario.component';

@NgModule({
  declarations: [
    RespostaFormularioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    ComponenteGlobalModule
  ],
  exports: [
    RespostaFormularioComponent
  ]
})
export class RespostaFormularioModule { }
