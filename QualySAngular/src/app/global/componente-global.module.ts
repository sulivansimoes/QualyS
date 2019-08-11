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
import { TelaMensagemComponent       } from './componentes/tela-mensagem.component';
import { TelaAjudaComponent          } from './componentes/ajuda/tela-ajuda.component';
import { TelaBoxComponent            } from './componentes/tela-box.component';
import { AjudaMenuPrincipalComponent } from './componentes/ajuda/ajuda-menu-principal.component';
import { AjudaInconformeComponent    } from './componentes/ajuda/ajuda-inconforme.component';
import { AjudaCadastroLocalComponent } from './componentes/ajuda/ajuda-cadastro-local.component';
import { AjudaCadastroFrequenciaComponent } from './componentes/ajuda/ajuda-cadastro-frequencia.component';
import { AjudaCadastroUsuarioComponent    } from './componentes/ajuda/ajuda-cadastro-usuario.component';
import { AjudaCadastroProgramaComponent   } from './componentes/ajuda/ajuda-cadastro-programa.component';
import { AjudaCadastroFormularioComponent } from './componentes/ajuda/ajuda-cadastro-formulario.component';
import { AjudaRespostaFormularioComponent } from './componentes/ajuda/ajuda-resposta-formulario.component';
// PIPE
import { CpfPipe } from './pipe/cpf.pipe';

const appRoutes = rotas

@NgModule({
  declarations: [
    NavBarComponent,
    BotoesSalvarFecharComponent,
    TelaConsultaPadraoComponent,
    PageNotFoundComponent,
    TelaMensagemComponent,
    TelaAjudaComponent,
    TelaBoxComponent,
    AjudaMenuPrincipalComponent,
    AjudaCadastroLocalComponent,
    AjudaCadastroFrequenciaComponent,
    AjudaCadastroUsuarioComponent,
    AjudaCadastroProgramaComponent,
    AjudaCadastroFormularioComponent,
    AjudaRespostaFormularioComponent,
    AjudaInconformeComponent,
    CpfPipe,
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
    TelaMensagemComponent,
    TelaBoxComponent,
    PageNotFoundComponent,
    AjudaMenuPrincipalComponent,
    AjudaCadastroLocalComponent,
    AjudaCadastroFrequenciaComponent,
    AjudaCadastroUsuarioComponent,
    AjudaCadastroProgramaComponent,
    AjudaCadastroFormularioComponent,
    AjudaRespostaFormularioComponent,
    AjudaInconformeComponent,
    CpfPipe
  ]
})
export class ComponenteGlobalModule { }
