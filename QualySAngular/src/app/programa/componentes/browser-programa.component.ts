//COMPONENTES PADRÕES
import { Component, OnInit } from '@angular/core';
import { Subscription      } from 'rxjs';
//COMPONENTES PERSONALIZADOS
import { Programa            } from './../model/programa';
import { ProgramaService     } from './../model/programa.service';
import { msgConfirmaExclusao } from 'src/app/global/funcoes/mensagensPadroes';

@Component({
  selector: 'app-browser-programa',
  templateUrl: './../view/browser-programa.component.html',
  styleUrls: [
    './../view/browser-programa.component.css',
    './../../global/view/estilo-global-crud.css',
    './../../global/view/icones.css'
  ]
})
export class BrowserProgramaComponent implements OnInit {

  private inscricao     = new Subscription;
  private resultadoApi  = null;
  private errosApi      = null;
  private paginaAtual   = 1;     // Dizemos que queremos que o componente quando carregar, inicialize na página 1.
  private programas:Programa[] = []; 
  private idPrograma      = null;  // captura id da frequencia que será excluida.
  private pesquisa:String = "";
  private exclui          = false;
  private mensagemExclui  = msgConfirmaExclusao;
  private idModal         = "idMsgExcluiPrograma";

  static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere  

  constructor(private programaService : ProgramaService) { 
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
   * @description: Se inscreve no serviço que envia solicitação para API resgatar todos programas na base de dados.
   */
  getAll(){

    this.inscricao = this.programaService.getAllProgramas().subscribe(

        result => {
                    this.resultadoApi = result;
                    this.programas    = this.resultadoApi.registros;        
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

        this.programaService.getProgramasPorDescricao(this.pesquisa).subscribe(

                result => {
                            this.resultadoApi = result;
                            this.programas    = this.resultadoApi.registros;        
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
  confirmaExclusao(idPrograma:Number){
    
    this.exclui = !this.exclui;
    this.idPrograma = idPrograma;
    console.log("Id programa = " + idPrograma);
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
   * @description: Se inscreve no serviço que envia solicitação para API excluir programa na base de dados.
   */
  excluiPrograma(){

    this.inscricao = this.programaService.deletaPrograma(this.idPrograma).subscribe(

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

    this.errosApi = error + " /countErros: " + BrowserProgramaComponent.countErros++  ;
    console.log(this.errosApi);
  } 
  
  
}
