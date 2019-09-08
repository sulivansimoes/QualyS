// COMPONENTES PADRÕES
import { Component, OnInit      } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription           } from 'rxjs';
// COMPONENTES PERSONALIZADOS
import { Programa                } from './../model/programa';
import { ProgramaService         } from './../model/programa.service';
import { msgCamposNaoPreenchidos } from 'src/app/global/funcoes/mensagensPadroes';
import { msgConfirmaCancelamento } from 'src/app/global/funcoes/mensagensPadroes';

@Component({
  selector: 'app-programa',
  templateUrl: './../view/programa.component.html',
  styleUrls: [
    './../view/programa.component.css',
    './../../global/view/estilo-global-crud.css',
    './../../global/view/icones.css'
  ]
})
export class ProgramaComponent implements OnInit {

  //TAMANHO MAXIMO DE CAMPOS
  private SIZE_DESCRICAO = 60;
  private SIZE_SIGLA     = 8;
  private SIZE_VERSAO    = 3;

  private inscricao          = new Subscription;
  private programa: Programa = new Programa();
  private camposObrigatorios = false;
  private mensagemAviso      = null;
  private errosApi           = null;
  // Variaveis usadas no modal de cancelamento
  private mensagemCancelamento    = msgConfirmaCancelamento;
  private cancela                 = false; 
  private idModal                 = "idCancelaFrequencia"

  static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere

  
  constructor(private router:Router,
              private programaService:ProgramaService,
              private route: ActivatedRoute
             ) { 
  }

 
  ngOnInit() { 

    //Recupera o conteudo dos parametros e inicializa campos.
    //Também resgata a instancia da inscrição.
    this.inscricao = this.route.queryParams.subscribe(
        (queryParams: any) => {

          this.programa.id           = queryParams['id'           ];
          this.programa.descricao    = queryParams['descricao'    ];
          this.programa.sigla        = queryParams['sigla'        ];
          this.programa.versao       = queryParams['versao'       ];
          this.programa.data_vigencia= queryParams['data_vigencia'];
          this.programa.data_revisao = queryParams['data_revisao' ];
          this.programa.versao       = queryParams['versao'       ];
          this.programa.oficio       = queryParams['oficio'       ];
          this.programa.bloqueado    = queryParams['bloqueado'    ];


          if(this.programa.data_vigencia){

            this.programa.data_vigencia= this.programa.data_vigencia.substring(0,10);
          }
          if(this.programa.data_revisao){
            
            this.programa.data_revisao = this.programa.data_revisao.substring(0,10);
          }
        }
    );
  } 


  /**
   * Destruo a inscrição ao finalizar
   */
  ngOnDestroy(){

    this.inscricao.unsubscribe();
  }  


  /**
   * @description Função valida se informações do formulário estão corretas. Vê se o que está sendo feito
   *              é atualização ou salvamento de um novo registro e chama a função responsável pela ação.
   */
  private salva(){

    if( this.isEmpty() ){

      this.camposObrigatorios = true;
      this.setMensagemAviso();
      return;

    }else{

      this.camposObrigatorios = false;
    }

    if(this.programa.id){
      
      this.atualizaPrograma();
    }else{
      
      this.salvaPrograma();
    }
  }


  /**
   * @description Envia solicitação para salvar programa no BD
   */
  private salvaPrograma(){

    this.programaService.salvaPrograma(this.programa)
                        .subscribe( 
                                     result =>{ 
                                                 alert("deu certo salvamento");
                                                 this.programa = new Programa();
                                              },
                                     erros => { 
                                                 this.setErrosApi(erros);
                                              }
                                  );
  }  


 /**
   * @description Se inscreve no serviço que envia solicitação para API atualizar frequência na base de dados.
   */
  private atualizaPrograma(){

    this.programaService.atualizaPrograma(this.programa)
                        .subscribe( 
                                    result =>{ 
                                               alert("deu certo atualização");
                                             },
                                    erros => { 
                                               this.setErrosApi(erros);
                                             }
                                  );
    // this.fechaTela();
  } 


  /**
   * @description: Aciona modal para confirmar cancelamento
   * */
  private botaoCancelaClicado(){
    this.cancela = !this.cancela;
  }


  /**
   * @description: Fecha modal e Volta para a tela do browser
   */
  private fechaTela(){

    this.fechaModalCancelar();
    this.router.navigateByUrl("browser-programa");
  }
  

  /**
   * @description: Fecha modal de cancelamento
   */
  private fechaModalCancelar(){

    $( '#'+this.idModal ).modal('hide');
  }


 /**
   * @description  Valida se campos estão vazios.
   * @returns true caso algum campo esteja vazio, false caso contrário.
   */
  private isEmpty(){

    return this.programa.descricao == undefined     || 
           this.programa.descricao.trim() ==''      || 
           this.programa.descricao == null          ||

           this.programa.sigla == undefined         ||
           this.programa.sigla.trim()  ==''         ||
           this.programa.sigla == null              ||

           this.programa.data_vigencia == undefined ||
           this.programa.data_vigencia.trim() ==''  ||
           this.programa.data_vigencia == null      ||

           this.programa.oficio == undefined        ||
           this.programa.oficio.trim() ==''         ||
           this.programa.oficio == null             ||

           this.programa.versao == undefined        ||
           this.programa.versao.trim() ==''         ||
           this.programa.versao == null             ||

           this.programa.bloqueado == undefined     ||
           this.programa.bloqueado == null          ? true : false;
  }  


 /**
   * @description função seta conteudo da variavel erroApi, ela faz uso da varivel estática [ ela incrementa a countErros]
   *              para que a mensagem sempre seja alterada e assim ouvida pelo ngOnChanges da tela-erros
   * @param error error ocasionado na aplicação. 
   */
  setErrosApi(error){

    this.mensagemAviso = null;
    this.errosApi = error + " /countErros: " + ProgramaComponent.countErros++  ;
    console.log(this.errosApi);
  }


 /**
   * @description função seta conteudo da variavel mensagemAviso, ela faz uso da varivel estática [ ela incrementa a countErros]
   *              para que a mensagem sempre seja alterada e assim ouvida pelo ngOnChanges da tela-erros
   */
  setMensagemAviso(){

    this.errosApi = null;
    this.mensagemAviso = msgCamposNaoPreenchidos + " message: " + ProgramaComponent.countErros++;
    console.log(this.mensagemAviso);
  }    
}