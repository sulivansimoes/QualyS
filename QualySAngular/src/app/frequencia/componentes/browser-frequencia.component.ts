//COMPONENTES PADRÕES
import { Component, OnInit } from '@angular/core';
import { Subscription      } from 'rxjs';
//COMPONENTES PERSONALIZADOS
import { Frequencia        } from './../model/frequencia';
import { FrequenciaService } from './../model/frequencia.service';
import { msgConfirmaExclusao  } from 'src/app/global/funcoes/mensagensPadroes';

@Component({
  selector: 'app-browser-frequencia',
  templateUrl: '/../view/browser-frequencia.component.html',
  styleUrls: [
    '/../view/browser-frequencia.component.css',
    './../../global/view/estilo-global-crud.css',
    './../../global/view/icones.css'
  ]
})
export class BrowserFrequenciaComponent implements OnInit {
  
  private inscricao     = new Subscription;
  private resultadoApi  = null;
  private errosApi      = null;
  private paginaAtual   = 1;     // Dizemos que queremos que o componente quando carregar, inicialize na página 1.
  private frequencias:Frequencia[] = []; 
  private idFrequencia    = null;  // captura id da frequencia que será excluida.
  private pesquisa:String = "";
  private exclui          = false;
  private mensagemExclui  = msgConfirmaExclusao;
  private idModal         = "idMsgExcluiFrequencia";

  static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere

  constructor(private frequenciaService : FrequenciaService) {     
  }


  ngOnInit() {

    this.getAll();
  }


  /**
   * destruo a inscrição ao fechar.
   */
  ngOnDestroy(){
    
    this.inscricao.unsubscribe();
  }


  /**
   * @description: Se inscreve no serviço que envia solicitação para API resgatar todas frequências na base de dados.
   */
  getAll(){

    this.inscricao = this.frequenciaService.getAllFrequencias().subscribe(

        result => {
                    this.resultadoApi = result;
                    this.frequencias  = this.resultadoApi.registros;        
                  },
        error => {
                    this.setErrosApi(error);
                 }
    );
  }

  
  /**
   * @description: Se inscreve no serviço que envia solicitação para API resgatar todas frequências 
   *               pela descricao na base de dados.
   */  
  getFrequenciasPorDescricao(){

    if(this.pesquisa.trim() == ""){

        this.getAll();
    }else{

        this.frequenciaService.getFrequenciasPorDescricao(this.pesquisa).subscribe(

                result => {
                            this.resultadoApi = result;
                            this.frequencias  = this.resultadoApi.registros;        
                          },
                error => {
                            this.setErrosApi(error);
                         }
        );
    }
  }


  /**
   * @description: Apresenta o modal para usuário confirmar a exclusão.
   */
  confirmaExclusao(idFrequencia:Number){
    
    this.exclui = !this.exclui;
    this.idFrequencia = idFrequencia;
    console.log("Id frequencia = " + idFrequencia);
  }


  /**
   * @description Cancela a exclusão
   */
  cancelaExclusao(){

    this.fechaModalExclusao();
  } 

  /**
   *@description Fecha modal de  exclusão 
   */
  fechaModalExclusao(){
    $( '#'+this.idModal ).modal('hide');
  }


  /**
   * @description: Se inscreve no serviço que envia solicitação para API excluir frequência na base de dados.
   * @param idFrequencia, id da frequencia à ser salva na base de dados.
   */
  excluiFrequencia(){
    
    this.inscricao = this.frequenciaService.deletaFrequencia(this.idFrequencia).subscribe(

      result => {
                  this.getAll();
                },
      error => {
                  this.setErrosApi(error);
               }
    );

    this.fechaModalExclusao();
  }


  /**
   * @description função seta conteudo da variavel erroApi, ela faz uso da varivel estática [ ela incrementa a countErros]
   *              para que a mensagem sempre seja alterada e assim ouvida pelo ngOnChanges da tela-mensagem
   * @param error error ocasionado na aplicação. 
   */
  setErrosApi(error){

    this.errosApi = error + " /countErros: " + BrowserFrequenciaComponent.countErros++  ;
    console.log(this.errosApi);
  }


}
