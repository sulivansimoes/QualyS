// MODULOS PADRÕES
import { NgModule     } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
import { RouterModule } from '@angular/router';
// COMPONENTES PERSONALIZADOS
import { NavBarComponent             } from './componentes/nav-bar.component';
import { BotoesSalvarFecharComponent } from './componentes/botoes-salvar-fechar.component';
import { TelaConsultaPadraoComponent } from './componentes/tela-consulta-padrao.component';
import { PageNotFoundComponent       } from './componentes/page-not-found.component';
import { rotas                       } from './rotas/rotas';

const appRoutes = rotas

@NgModule({
  declarations: [
    NavBarComponent,
    BotoesSalvarFecharComponent,
    TelaConsultaPadraoComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    NavBarComponent,
    BotoesSalvarFecharComponent,
    TelaConsultaPadraoComponent,
    PageNotFoundComponent
  ]
})
export class ComponenteGlobalModule { }
