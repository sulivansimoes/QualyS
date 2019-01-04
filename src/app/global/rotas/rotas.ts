// COMPONENTES PADRÕES
import { Routes } from '@angular/router';
// COMPONENTES PERSONALIZADOS
import { PageNotFoundComponent       } from './../componentes/page-not-found.component';
import { UsuarioComponent            } from '../../usuario/componentes/usuario.component';
import { ProgramaComponent           } from '../../programa/componentes/programa.component';
import { LocalComponent              } from '../../local/componentes/local.component';
import { FrequenciaComponent         } from '../../frequencia/componentes/frequencia.component';
import { CadastroFormularioComponent } from '../../cadastro-formulario/componentes/cadastro-formulario.component';

export const rotas : Routes = [

    { path: "frequencia"         , component: FrequenciaComponent         },
    { path: "cadastro-formulario", component: CadastroFormularioComponent },
    { path: "local"              , component: LocalComponent              },
    { path: "programa"           , component: ProgramaComponent           },
    { path: "usuario"            , component: UsuarioComponent            },
    { path: '', redirectTo :  '' , pathMatch: 'full'                      },
    { path: '**'                 , component: PageNotFoundComponent       },
];