// COMPONETES PADRÕES
import { Component, OnInit      } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription           } from 'rxjs';
// COMPONENTES PERSONALIZDOS
import { Frequencia              } from './../model/frequencia';
import { FrequenciaService       } from './../model/frequencia.service';
import { msgCamposNaoPreenchidos } from 'src/app/global/funcoes/mensagensPadroes';

@Component({
  selector: 'app-frequencia',
  templateUrl: './../view/frequencia.component.html',
  styleUrls: [
    './../view/frequencia.component.css',
    './../../global/view/estilo-global-crud.css',
  ]
})
export class FrequenciaComponent implements OnInit {
    
  //TAMANHO DOS CAMPOS 
  private SIZE_ID        = 4;
  private SIZE_DESCRICAO = 15;

  private inscricao               = new Subscription;
  private frequencia:Frequencia   = null;
  private camposObrigatorios      = false;
  private mensagemAviso           = null;
  private errosApi                = null;

  static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere

  constructor( private router:Router , 
               private frequenciaService:FrequenciaService,
               private route: ActivatedRoute ) {
      
      // this.frequencia = new Frequencia();
  }
  

  ngOnInit() { 
    
      //Recupera o conteudo dos parametros e inicializa campos.
      //Também resgata a instancia da inscrição.
      this.inscricao = this.route.queryParams.subscribe(
                          (queryParams: any) => {

                            // this.frequencia.id        = queryParams['id'];
                            // this.frequencia.descricao = queryParams['descricao'];
                            this.getFrequencia().setId( queryParams['id'] );
                            this.getFrequencia().setDescricao( queryParams['descricao'] );
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

    if( this.getFrequencia().getId() ){
      
      this.atualizaFrequencia();
    }else{
      
      this.salvaFrequencia()
    }
  }


  /**
   * @description Se inscreve no serviço que envia solicitação para API salvar frequência na base de dados.
   */
  private salvaFrequencia(){
   
    this.frequenciaService.salvaFrequencia(this.frequencia)
                          .subscribe( 
                                        result =>{ 
                                                    alert("deu certo salvamento");
                                                    this.frequencia = new Frequencia();
                                                 },
                                        erros => { 
                                                    this.setErrosApi(erros);
                                                 }
                                     );

    
  }


 /**
  * @description Se inscreve no serviço que envia solicitação para API atualizar frequência na base de dados.
  */
  private atualizaFrequencia(){

    this.frequenciaService.atualizaFrequencia(this.getFrequencia())
                          .subscribe( 
                                        result =>{ 
                                                    alert("deu certo salvamento");
                                                 },
                                                    erros => { 
                                                    this.setErrosApi(erros);
                                                 }
                                     );
    // this.fechaTela();
  }


  /**
   * @description: fecha tela de inclusão e volta para a tela de browser.
   * */
  private fechaTela(){
   
    if(window.confirm("Se fechar as informações serão perdidas, deseja realmente fechar ? ")){
      this.router.navigateByUrl("browser-frequencia");
    }
  }


  /**
   *@description  Valida se campos estão vazios.
   *@returns true caso algum campo esteja vazio, false caso contrário.
   */
  private isEmpty(){

    // return this.frequencia.descricao == undefined || 
    //        this.frequencia.descricao.trim() ==''  || 
    //        this.frequencia.descricao == null      ? true : false;

    return this.getFrequencia().getDescricao() == undefined || 
           this.getFrequencia().getDescricao().trim() ==''  || 
           this.getFrequencia().getDescricao() == null      ? true : false;
  }


 /**
   * @description função seta conteudo da variavel erroApi, ela faz uso da varivel estática [ ela incrementa a countErros]
   *              para que a mensagem sempre seja alterada e assim ouvida pelo ngOnChanges da tela-erros
   * @param error error ocasionado na aplicação. 
   */
  setErrosApi(error){

    this.mensagemAviso = null;
    this.errosApi = error + " /countErros: " + FrequenciaComponent.countErros++  ;
    console.log(this.errosApi);
  }


 /**
   * @description função seta conteudo da variavel mensagemAviso, ela faz uso da varivel estática [ ela incrementa a countErros]
   *              para que a mensagem sempre seja alterada e assim ouvida pelo ngOnChanges da tela-erros
   */
  setMensagemAviso(){
    this.errosApi = null;
    this.mensagemAviso = msgCamposNaoPreenchidos + " message: " + FrequenciaComponent.countErros++;
    console.log(this.mensagemAviso);
  }


  /**
   * @description: Retorna instancia de frequencia alocada em memória.
   * @return {Frequencia} - frequencia alocada em memoria.
   */
  private getFrequencia():Frequencia{

    if(this.frequencia == null){
      this.frequencia = new Frequencia();
    }
    return this.frequencia;
  }

}