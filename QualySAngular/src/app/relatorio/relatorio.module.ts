// MODULOS PADRÕES
import { RouterModule } from '@angular/router';
import { NgModule         } from '@angular/core';
import { CommonModule     } from '@angular/common';
import { FormsModule      } from '@angular/forms';
// MODULOS PERSONALIZADOS
import { VistoriaRealizadaComponent } from './componentes/vistoria-realizada.component';
import { ComponenteGlobalModule     } from '../global/componente-global.module';
// COMPONENTES PERSONALIZADOS
import { rotas                      } from '../global/rotas/rotas';

const appRoutes = rotas;

@NgModule({
  declarations: [
    VistoriaRealizadaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),

    ComponenteGlobalModule
  ]
})
export class RelatorioModule { }
