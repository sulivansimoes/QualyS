//COMPONENTES PADRÕES
import { Component, OnInit } from '@angular/core';
import { Subscription      } from 'rxjs';
//COMPONENTES PERSONALIZADOS
import { Programa          } from './../model/programa';
import { ProgramaService   } from './../model/programa.service';

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

  public inscricao     = new Subscription;
  public resultadoApi  = null;
  public errosApi      = null;
  public paginaAtual   = 1;     // Dizemos que queremos que o componente quando carregar, inicialize na página 1.
  public programas:Programa[] = []; 
  public pesquisa:String = "";

  static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere  

  constructor(private programaService : ProgramaService) { 

    this.getAll();
  }


  ngOnInit() { }


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
   * @description: Se inscreve no serviço que envia solicitação para API excluir programa na base de dados.
   * @param programa, programa à ser salvo na base de dados.
   */
  excluiPrograma(programa : Programa){

    this.inscricao = this.programaService.deletaPrograma(programa).subscribe(

      result => {
                  this.getAll();
                },
      error => {
                  this.setErrosApi(error);
               }
    ); 
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
