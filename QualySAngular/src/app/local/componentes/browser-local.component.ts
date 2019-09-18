//COMPONENTES PADRÕES
import { Component, OnInit } from '@angular/core';
import { Subscription      } from 'rxjs';
//COMPONENTES PERSONALIZADOS
import { Local             } from './../model/local';
import { LocalService      } from './../model/local.service';
import { msgConfirmaExclusao } from 'src/app/global/funcoes/mensagensPadroes';


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
  private idLocal         = null;  // captura id do local que será excluido.
  private pesquisa:String = "";
  private exclui          = false;
  private mensagemExclui  = msgConfirmaExclusao;
  private idModal         = "idMsgExcluiLocal";

  static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere  
  
  constructor(private localservice:LocalService) { 
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
   * @description: Apresenta o modal para usuário confirmar a exclusão.
   */
  confirmaExclusao(idLocal:Number){
    
    this.exclui = !this.exclui;
    this.idLocal = idLocal;
    console.log("Id Local = " + idLocal);
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
   * @description: Se inscreve no serviço que envia solicitação para API excluir local na base de dados.
   * @param idLocal, id do local à ser exluida na base de dados.
   */
  excluiLocal(){

    this.inscricao = this.localservice.deletaLocal(this.idLocal).subscribe(

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

    this.errosApi = error + " /countErros: " + BrowserLocalComponent.countErros++  ;
    console.log(this.errosApi);
  }

}
