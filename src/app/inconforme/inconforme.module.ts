//MODULOS PADROES
import { NgModule     } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
//MODULOS PERSONALILZADOS
import { ComponenteGlobalModule } from './../global/componente-global.module';
//COMPONENTES PERSONALIZADOS
import { IncoformeComponent     } from './componentes/incoforme.component';

@NgModule({
  declarations: [
    IncoformeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    ComponenteGlobalModule
  ],
  exports: [
    IncoformeComponent
  ]
})
export class InconformeModule { }
