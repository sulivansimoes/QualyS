// COMPONENTES PADRÕES
import { Routes } from '@angular/router';
// COMPONENTES PERSONALIZADOS
import { PageNotFoundComponent       } from './../componentes/page-not-found.component';
import { UsuarioComponent            } from '../../usuario/componentes/usuario.component';
import { ProgramaComponent           } from '../../programa/componentes/programa.component';
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

export const rotas : Routes = [

    { path: "browser-frequencia"            , component: BrowserFrequenciaComponent         },
    { path: "browser-cadastro-formulario"   , component: BrowserCadastroFormularioComponent },
    { path: "browser-local"                 , component: BrowserLocalComponent              },
    { path: "browser-programa"              , component: BrowserProgramaComponent           },
    { path: "browser-usuario"               , component: BrowserUsuarioComponent            },
    { path: "browser-inconforme"            , component: BrowserInconformeComponent         },
    { path: "browser-local/local"           , component: LocalComponent                     },
    { path: "browser-programa/programa"     , component: ProgramaComponent                  },
    { path: "browser-frequencia/frequencia" , component: FrequenciaComponent                },
    { path: "browser-usuario/usuario"       , component: UsuarioComponent                   },
    { path: "browser-cadastro-formulario/cadastro-formulario", component: CadastroFormularioComponent        },
    { path: "resposta-formulario"           , component: RespostaFormularioComponent        },
    { path: '', redirectTo :  ''            , pathMatch: 'full'                             },
    { path: '**'                            , component: PageNotFoundComponent              }
];