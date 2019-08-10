//COMPONENTES PADRÕES
import { Component, OnInit } from '@angular/core';
import { Subscription      } from 'rxjs';
//COMPONENTES PERSONALIZADOS
import { Local             } from './../model/local';
import { LocalService      } from './../model/local.service';


@Component({
  selector: 'app-browser-local',
  templateUrl: './../view/browser-local.component.html',
  styleUrls: [
    './../view/browser-local.component.css',
    './../../global/view/estilo-global-crud.css',
    './../../global/view/icones.css'
  ]
})
export class BrowserLocalComponent implements OnInit {

  private inscricao     = new Subscription;
  private resultadoApi  = null;
  private errosApi      = null;
  private paginaAtual   = 1;     // Dizemos que queremos que o componente quando carregar, inicialize na página 1.
  private locais:Local [] = []; 
  private pesquisa:String = "";

  static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere  
  
  constructor(private localservice:LocalService) { 
      
    this.getAll();
  }

  ngOnInit() {}


  /**
   * destruo a inscrição ao fechar.
   */
  ngOnDestroy(){
    
    this.inscricao.unsubscribe();
  }


  /**
   * @description: Se inscreve no serviço que envia solicitação para API resgatar todos locais na base de dados.
   */
  getAll(){

    this.inscricao = this.localservice.getAllLocais().subscribe(

        result => {
                    this.resultadoApi = result;
                    this.locais  = this.resultadoApi.registros;        
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
  getLocaisPorDescricao(){

    if(this.pesquisa.trim() == ""){

        this.getAll();
    }else{

        this.localservice.getLocaisPorDescricao(this.pesquisa).subscribe(

                result => {
                            this.resultadoApi = result;
                            this.locais  = this.resultadoApi.registros;        
                          },
                error => {
                            this.setErrosApi(error);
                         }
        );
    }
  }


  /**
   * @description: Se inscreve no serviço que envia solicitação para API excluir local na base de dados.
   * @param idLocal, id do local à ser exluida na base de dados.
   */
  excluiLocal(idLocal : number){

    this.inscricao = this.localservice.deletaLocal(idLocal).subscribe(

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

    this.errosApi = error + " /countErros: " + BrowserLocalComponent.countErros++  ;
    console.log(this.errosApi);
  }

}
