// MODULOS PADRÕES
import { RouterModule } from '@angular/router';
import { NgModule         } from '@angular/core';
import { CommonModule     } from '@angular/common';
import { FormsModule      } from '@angular/forms';
// MODULOS PERSONALIZADOS
import { VistoriaRealizadaComponent } from './componentes/vistoria-realizada.component';
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
  ]
})
export class RelatorioModule { }
