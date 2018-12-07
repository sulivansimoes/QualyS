// MÓDULOS PADRÕES
import { BrowserModule    } from '@angular/platform-browser';
import { NgModule         } from '@angular/core';
import { FormsModule      } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
// MÓDULOS PERSONALIZADOS
import { LocalModule      } from './local/local.module';
import { FrequenciaModule } from './frequencia/frequencia.module';
import { ComponenteGlobalModule } from './global/componente-global.module';
// COMPONENTES PADRÕES
import { AppComponent     } from './app.component';
// COMPONENTES PERSONALIZADOS
// import { BotoesSalvarFecharComponent } from './global/componentes/botoes-salvar-fechar.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    
    LocalModule,
    FrequenciaModule,
    ComponenteGlobalModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
