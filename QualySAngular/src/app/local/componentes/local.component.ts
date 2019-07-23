// COMPONENTES PADRÕES
import { Component, OnInit      } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription           } from 'rxjs';
// COMPONENTES PERSONALIZADOS
import { Local                   } from './../Model/local';
import { LocalService            } from './../model/local.service';
import { msgCamposNaoPreenchidos } from 'src/app/global/funcoes/mensagensPadroes';

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
  private local:Local        = new Local();
  private camposObrigatorios = false;
  private mensagemAviso      = null;
  private errosApi           = null;

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

          this.local.id        = queryParams['id'];
          this.local.descricao = queryParams['descricao'];
          this.local.bloqueado = queryParams['bloqueado'];
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

    if(this.local.id){
      
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

      this.localService.atualizaLocal(this.local)
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
  * @description: fecha tela de inclusão e volta para a tela de browser.
  */
  private fechaTela(){
   
    if(window.confirm("Se fechar as informações serão perdidas, deseja realmente fechar ? ")){
      this.router.navigateByUrl("browser-local");
    }
  }


 /**
   * @description  Valida se campos estão vazios.
   * @returns true caso algum campo esteja vazio, false caso contrário.
   */
  private isEmpty(){

    return this.local.descricao == undefined || 
           this.local.descricao.trim() ==''  || 
           this.local.descricao == null      ||
           this.local.bloqueado == undefined ||
           this.local.bloqueado == null      ? true : false;
  }


 /**
   * @description função seta conteudo da variavel erroApi, ela faz uso da varivel estática [ ela incrementa a countErros]
   *              para que a mensagem sempre seja alterada e assim ouvida pelo ngOnChanges da tela-erros
   * @param error error ocasionado na aplicação. 
   */
  setErrosApi(error){

    this.mensagemAviso = null;
    this.errosApi = error + " /countErros: " + LocalComponent.countErros++  ;
    console.log(this.errosApi);
  }


 /**
   * @description função seta conteudo da variavel mensagemAviso, ela faz uso da varivel estática [ ela incrementa a countErros]
   *              para que a mensagem sempre seja alterada e assim ouvida pelo ngOnChanges da tela-erros
   */
  setMensagemAviso(){

    this.errosApi = null;
    this.mensagemAviso = msgCamposNaoPreenchidos + " message: " + LocalComponent.countErros++;
    console.log(this.mensagemAviso);
  }  

}