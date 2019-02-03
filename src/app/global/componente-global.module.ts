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
import { TelaAjudaComponent          } from './componentes/ajuda/tela-ajuda.component';
import { AjudaCadastroLocalComponent } from './componentes/ajuda/ajuda-cadastro-local.component';
import { AjudaCadastroFrequenciaComponent } from './componentes/ajuda/ajuda-cadastro-frequencia.component';

const appRoutes = rotas

@NgModule({
  declarations: [
    NavBarComponent,
    BotoesSalvarFecharComponent,
    TelaConsultaPadraoComponent,
    PageNotFoundComponent,
    TelaAjudaComponent,
    AjudaCadastroLocalComponent,
    AjudaCadastroFrequenciaComponent
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
    PageNotFoundComponent,
    AjudaCadastroLocalComponent,
    AjudaCadastroFrequenciaComponent
  ]
})
export class ComponenteGlobalModule { }
