import { AuthGuardService as AuthGuard } from './../../usuario/model/auth-guard.service';
// COMPONENTES PADRÕES
import { Routes } from '@angular/router';
// COMPONENTES PERSONALIZADOS
import { LoginComponent              } from './../../usuario/componentes/login.component';
import { PageNotFoundComponent       } from './../componentes/page-not-found.component';
import { UsuarioComponent            } from '../../usuario/componentes/usuario.component';
import { ProgramaComponent           } from '../../programa/componentes/programa.component';
import { InconformeComponent         } from './../../inconforme/componentes/inconforme.component';
import { LocalComponent              } from '../../local/componentes/local.component';
import { FrequenciaComponent         } from '../../frequencia/componentes/frequencia.component';
import { CadastroFormularioComponent } from '../../cadastro-formulario/componentes/cadastro-formulario.component';
import { BrowserFrequenciaComponent  } from './../../frequencia/componentes/browser-frequencia.component';
import { BrowserLocalComponent       } from './../../local/componentes/browser-local.component';
import { BrowserProgramaComponent    } from './../../programa/componentes/browser-programa.component';
import { BrowserUsuarioComponent     } from './../../usuario/componentes/browser-usuario.component';
import { BrowserInconformeComponent  } from './../../inconforme/componentes/browser-inconforme.component';
import { RespostaFormularioComponent } from './../../resposta-formulario/componentes/resposta-formulario.component';
import { BrowserCadastroFormularioComponent } from './../../cadastro-formulario/componentes/browser-cadastro-formulario.component';
import { VistoriaRealizadaComponent  } from './../../relatorio/componentes/vistoria-realizada.component';

export const rotas : Routes = [

    // TELAS DE CADASTROS 
    { path: "login"                         , component: LoginComponent                                               },
    { path: "browser-frequencia"            , component: BrowserFrequenciaComponent        /*, canActivate: [AuthGuard]*/ },
    { path: "browser-cadastro-formulario"   , component: BrowserCadastroFormularioComponent/*, canActivate: [AuthGuard]*/ },
    { path: "browser-local"                 , component: BrowserLocalComponent             /*, canActivate: [AuthGuard]*/ },
    { path: "browser-programa"              , component: BrowserProgramaComponent          /*, canActivate: [AuthGuard]*/ },
    { path: "browser-usuario"               , component: BrowserUsuarioComponent           /*, canActivate: [AuthGuard]*/ },
    { path: "browser-inconforme"            , component: BrowserInconformeComponent        /*, canActivate: [AuthGuard]*/ },
    { path: "browser-local/local"           , component: LocalComponent                    /*, canActivate: [AuthGuard]*/ },
    { path: "browser-programa/programa"     , component: ProgramaComponent                 /*, canActivate: [AuthGuard]*/ },
    { path: "browser-frequencia/frequencia" , component: FrequenciaComponent               /*, canActivate: [AuthGuard]*/ },
    { path: "browser-inconforme/inconforme" , component: InconformeComponent               /*, canActivate: [AuthGuard]*/ },
    { path: "browser-usuario/usuario"       , component: UsuarioComponent                  /*, canActivate: [AuthGuard]*/ },
    { path: "browser-cadastro-formulario/cadastro-formulario", component: CadastroFormularioComponent   /*, canActivate: [AuthGuard]*/ },
    { path: "resposta-formulario"           , component: RespostaFormularioComponent       /*, canActivate: [AuthGuard]*/ },
    // RELATÓRIOS
    { path: "relatorio-vistoria-realizada"  , component: VistoriaRealizadaComponent        /*, canActivate: [AuthGuard]*/ }, 
    // OUTROS
    { path: '', redirectTo :  ''            , pathMatch: 'full'                            /*, canActivate: [AuthGuard]*/},
    { path: '**'                            , component: PageNotFoundComponent             /*, canActivate: [AuthGuard]*/}
];