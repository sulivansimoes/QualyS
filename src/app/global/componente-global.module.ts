// MODULOS PADRÕES
import { NgModule     } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
// COMPONENTES PERSONALIZADOS
import { BotoesSalvarFecharComponent } from './componentes/botoes-salvar-fechar.component';
import { TelaConsultaPadraoComponent } from './componentes/tela-consulta-padrao.component';

@NgModule({
  declarations: [
    BotoesSalvarFecharComponent,
    TelaConsultaPadraoComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    BotoesSalvarFecharComponent
  ]
})
export class ComponenteGlobalModule { }
