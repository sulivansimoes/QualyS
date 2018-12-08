// MÓDULOS PADRÕES
import { BrowserModule    } from '@angular/platform-browser';
import { NgModule         } from '@angular/core';
import { FormsModule      } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
// MÓDULOS PERSONALIZADOS
import { LocalModule      } from './local/local.module';
import { ProgramaModule   } from './programa/programa.module';
import { FrequenciaModule } from './frequencia/frequencia.module';
import { InconformeModule } from './inconforme/inconforme.module';
import { UsuarioModule    } from './usuario/usuario.module';
import { ComponenteGlobalModule   } from './global/componente-global.module';
import { RespostaFormularioModule } from './resposta-formulario/resposta-formulario.module';
// COMPONENTES PADRÕES
import { AppComponent     } from './app.component';
// COMPONENTES PERSONALIZADOS

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    
    ComponenteGlobalModule,
    LocalModule,
    FrequenciaModule,
    RespostaFormularioModule,
    ProgramaModule,
    InconformeModule,
    UsuarioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
