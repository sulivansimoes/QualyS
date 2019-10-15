//COMPONENTES PADRÕES
import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Subscription       } from 'rxjs';
//COMPONENTES PERSONALIZADOS
import { CadastroFormulario        } from './../model/cadastro-formulario';
import { CadastroFormularioService } from './../model/cadastro-formulario.service';
import { msgConfirmaExclusao  } from 'src/app/global/funcoes/mensagensPadroes';

@Component({
  selector: 'app-browser-cadastro-formulario',
  templateUrl: './../view/browser-cadastro-formulario.component.html',
  styleUrls: [
    './../view/browser-cadastro-formulario.component.css',
    './../../global/view/estilo-global-crud.css',
    './../../global/view/icones.css'
  ]
})
export class BrowserCadastroFormularioComponent implements OnInit, OnDestroy {

  private inscricao     = new Subscription;
  private resultadoApi  = null;
  private errosApi      = null;
  private paginaAtual   = 1;     // Dizemos que queremos que o componente quando carregar, inicialize na página 1.
  private formularios:CadastroFormulario[] = []; 
  private idFormulario    = null;  // captura id da frequencia que será excluida.
  private pesquisa:String = "";
  private exclui          = false;
  private mensagemExclui  = msgConfirmaExclusao;
  private idModal         = "idMsgExcluiFrequencia";

  static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere  

  constructor(private cadastroFormularioService : CadastroFormularioService) { 

  }

  ngOnInit() { 

    this.getAll();
  }


  /**
   * destruo variaveis antes de fechar
   */
  ngOnDestroy(){
    
    this.inscricao.unsubscribe();
    this.resultadoApi = null;
    this.errosApi     = null;
    this.formularios  = null;     
  }  


  /**
   * @description: Se inscreve no serviço que envia solicitação para API resgatar todos formularios na base de dados.
   */
  getAll(){

    this.inscricao = this.cadastroFormularioService.getAllCabecalhoFormularios().subscribe(

        result => {
                    this.resultadoApi = result;
                    this.formularios  = this.resultadoApi.registros;        
                  },
        error => {
                    this.setErrosApi(error);
                 }
    );
  }  


   /**
   * @description: Se inscreve no serviço que envia solicitação para API resgatar todos locais 
   *               pela descricao na base de dados.
   */ 
  private getFormulariosPorDescricao(){
    
      if(this.pesquisa.trim() == ""){

        this.getAll();
      }else{

          this.cadastroFormularioService.getFormulariosPorDescricao(this.pesquisa).subscribe(

                  result => {
                              this.resultadoApi = result;
                              this.formularios  = this.resultadoApi.registros;        
                            },
                  error => {
                              this.setErrosApi(error);
                            }
          );
      } 
  }
  

  /**
   * @description Envia solicitação para o service deletar o formulario.
   */
  private excluiFormulario(){

      this.inscricao = this.cadastroFormularioService.deletaFormulario(this.idFormulario).subscribe(

          result => {
                      this.resultadoApi = result;
                      this.getAll()
                      console.log(this.resultadoApi.mensagem);        
                    },
          error => {
                      this.setErrosApi(error);
                  }
      );    

      this.fechaModalExclusao();
  }

  /**
   * @description: Apresenta o modal para usuário confirmar a exclusão.
   * @param {Number} idFormulario id do formulario que deverá ser excluido 
   */
  confirmaExclusao(idFormulario:Number){
    
    this.exclui = !this.exclui;
    this.idFormulario = idFormulario;
    console.log("Id formulario = " + idFormulario);
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
   * @description função seta conteudo da variavel erroApi, ela faz uso da varivel estática [ ela incrementa a countErros]
   *              para que a mensagem sempre seja alterada e assim ouvida pelo ngOnChanges da tela-mensagem
   * @param error error ocasionado na aplicação. 
   */
  setErrosApi(error){

    this.errosApi = error + " /countErros: " + BrowserCadastroFormularioComponent.countErros++  ;
    console.log(this.errosApi);
  }  
}
