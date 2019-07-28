//COMPONENTES PADRÕES
import { Component, OnInit  } from '@angular/core';
import { Subscription       } from 'rxjs';
//COMPONENTES PERSONALIZADOS
import { CadastroFormulario        } from './../model/cadastro-formulario';
import { CadastroFormularioService } from './../model/cadastro-formulario.service';

@Component({
  selector: 'app-browser-cadastro-formulario',
  templateUrl: './../view/browser-cadastro-formulario.component.html',
  styleUrls: [
    './../view/browser-cadastro-formulario.component.css',
    './../../global/view/estilo-global-crud.css',
    './../../global/view/icones.css'
  ]
})
export class BrowserCadastroFormularioComponent implements OnInit {

  public inscricao     = new Subscription;
  public resultadoApi  = null;
  public errosApi      = null;
  public paginaAtual   = 1;     // Dizemos que queremos que o componente quando carregar, inicialize na página 1.
  public formularios:CadastroFormulario[] = []; 
  public pesquisa:String = "";

  static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere  

  constructor(private cadastroFormularioService : CadastroFormularioService) { 

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
   * @param {number} id - id do formulario que deve ser excluido.
   */
  private excluiFormulario(id:number){

      this.inscricao = this.cadastroFormularioService.deletaFormulario(id).subscribe(

          result => {
                      this.resultadoApi = result;
                      this.getAll()
                      alert(this.resultadoApi.mensagem);        
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

    this.errosApi = error + " /countErros: " + BrowserCadastroFormularioComponent.countErros++  ;
    console.log(this.errosApi);
  }  
}
