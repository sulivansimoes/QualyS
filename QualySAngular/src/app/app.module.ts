// MÓDULOS PADRÕES
import { BrowserModule    } from '@angular/platform-browser';
import { NgModule         } from '@angular/core';
import { FormsModule      } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule     } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
// MÓDULOS PERSONALIZADOS
import { RelatorioModule  } from './relatorio/relatorio.module';
import { LocalModule      } from './local/local.module';
import { ProgramaModule   } from './programa/programa.module';
import { FrequenciaModule } from './frequencia/frequencia.module';
import { InconformeModule } from './inconforme/inconforme.module';
import { UsuarioModule    } from './usuario/usuario.module';
import { ComponenteGlobalModule   } from './global/componente-global.module';
import { CadastroFormularioModule } from './cadastro-formulario/cadastro-formulario.module';
import { RespostaFormularioModule } from './resposta-formulario/resposta-formulario.module';
// MÓDULOES DE TERCEIROS
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
// COMPONENTES PADRÕES
import { AppComponent     } from './app.component';
// COMPONENTES PERSONALIZADOS
import { rotas            } from './global/rotas/rotas';
import { HomeGraficosComponent } from './home-inicial/home-graficos/componentes/home-graficos.component';
const appRoutes = rotas

@NgModule({
  declarations: [
    AppComponent,
    HomeGraficosComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  
    ComponenteGlobalModule,
    LocalModule,
    FrequenciaModule,
    ProgramaModule,
    InconformeModule,
    UsuarioModule,
    CadastroFormularioModule,
    RespostaFormularioModule,
    RelatorioModule,

    Ng2GoogleChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
