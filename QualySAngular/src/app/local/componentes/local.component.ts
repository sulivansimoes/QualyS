// COMPONENTES PADRÕES
import { Component, OnInit      } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription           } from 'rxjs';
// COMPONENTES PERSONALIZADOS
import { Local                   } from './../Model/local';
import { LocalService            } from './../model/local.service';
import { msgCamposNaoPreenchidos } from 'src/app/global/funcoes/mensagensPadroes';
import { msgConfirmaCancelamento } from 'src/app/global/funcoes/mensagensPadroes';

@Component({
  selector: 'app-local',
  templateUrl: './../view/local.component.html',
  styleUrls: [
    './../view/local.component.css' , 
    './../../global/view/estilo-global-crud.css',
  ]
})
export class LocalComponent implements OnInit {

  //TAMANHO DOS CAMPOS
  private SIZE_DESCRICAO = 25;

  private inscricao          = new Subscription;
  private local:Local        = null;
  private camposObrigatorios = false;
  private mensagemAviso      = null;
  private errosApi           = null;
  // Variaveis usadas no modal de cancelamento
  private mensagemCancelamento    = msgConfirmaCancelamento;
  private cancela                 = false; 
  private idModal                 = "idCancelaLocal"  

  static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere

  
  constructor(private router:Router,
              private localService:LocalService,
              private route: ActivatedRoute
              ) { 
  }


  ngOnInit() { 

      //Recupera o conteudo dos parametros e inicializa campos.
      //Também resgata a instancia da inscrição.
      this.inscricao = this.route.queryParams.subscribe(
        (queryParams: any) => {

          this.getLocal().setId( queryParams['id'] );
          this.getLocal().setDescricao( queryParams['descricao'] );
          this.getLocal().setBloqueado( queryParams['bloqueado'] );
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

    if(this.getLocal().getId()){
      
      this.atualizaLocal();
    }else{
      
      this.salvaLocal();
    }
  }
 
  
  /**
   * Resumo: Salva novo local.
   */
  private salvaLocal(){

     this.localService.salvaLocal(this.local)
                      .subscribe( 
                                  result =>{ 
                                              alert("deu certo salvamento");
                                              this.local = new Local();
                                            },
                                  erros => { 
                                              this.setErrosApi(erros);
                                            }
                                );
  }


  /**
   * @description Se inscreve no serviço que envia solicitação para API atualizar frequência na base de dados.
   */
  private atualizaLocal(){

      this.localService.atualizaLocal( this.local )
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
   */
  private botaoCancelaClicado(){
    this.cancela = !this.cancela;
  }


  /**
   * @description: Fecha modal e Volta para a tela do browser
   */
  private fechaTela(){

    this.fechaModalCancelar();
    this.router.navigateByUrl("browser-local");
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

    return this.getLocal().getDescricao() == undefined || 
           this.getLocal().getDescricao().trim() ==''  || 
           this.getLocal().getDescricao() == null      ||
           this.getLocal().isBloqueado()  == undefined ||
           this.getLocal().isBloqueado()  == null      ? true : false;
  }


 /**
   * @description função seta conteudo da variavel erroApi, ela faz uso da varivel estática [ ela incrementa a countErros]
   *              para que a mensagem sempre seja alterada e assim ouvida pelo ngOnChanges da tela-erros
   * @param error error ocasionado na aplicação. 
   */
  private setErrosApi(error){

    this.mensagemAviso = null;
    this.errosApi = error + " /countErros: " + LocalComponent.countErros++  ;
    console.log(this.errosApi);
  }


 /**
   * @description função seta conteudo da variavel mensagemAviso, ela faz uso da varivel estática [ ela incrementa a countErros]
   *              para que a mensagem sempre seja alterada e assim ouvida pelo ngOnChanges da tela-erros
   */
  private setMensagemAviso(){

    this.errosApi = null;
    this.mensagemAviso = msgCamposNaoPreenchidos + " message: " + LocalComponent.countErros++;
    console.log(this.mensagemAviso);
  } 
  
  /**
   * @description: Retorna uma instancia de local alocada em memória.
   * @return {Local} local alocado em memória.
   */
  private getLocal():Local {
    
    if(this.local == null){
      this.local = new Local();
    }
    return this.local;
  }

}