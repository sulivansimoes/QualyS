// COMPONENTES PADRÕES
import { Component, OnInit } from '@angular/core';
import { Subscription      } from 'rxjs';
// COMPONENTES PERSONALIZADOS
import { Inconforme        } from '../model/inconforme';
import { InconformeService } from './../model/inconforme.service';
import { Time } from '@angular/common';

@Component({
  selector: 'app-browser-inconforme',
  templateUrl: './../view/browser-inconforme.component.html',
  styleUrls: [
    './../view/browser-inconforme.component.css',
    './../../global/view/estilo-global-crud.css',
    './../../global/view/icones.css'
  ]
})
export class BrowserInconformeComponent implements OnInit {

  private inscricao     = new Subscription;
  private resultadoApi  = null;
  private errosApi      = null;
  private mensagemAviso = null;
  private paginaAtual   = 1;     // Dizemos que queremos que o componente quando carregar, inicialize na página 1.
  private inconformes:Inconforme[] = []; 
  private pesquisa:String = "";

  static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere

  constructor(private inconformeService : InconformeService) {

  }
  
  
  ngOnInit() {
    
    this.getAll() ;
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

    this.inscricao = this.inconformeService.getAllInconformes().subscribe(

        result => {
                    this.resultadoApi = result;
                    this.inconformes  = this.resultadoApi.registros;        
                  },
        error => {
                    this.setErrosApi(error);
                 }
    );
  }


  /**
   * @description: Envia solicitação para o service estornar ação corretiva do inconforme.
   * @param {number} id      - id do inconforme
   * @param {number} item    - item do inconforme
   * @param {String} emissao - data que inconfrme foi gerado
   * @param {Time  } hora    - hora que inconfrme foi gerado
   * @param {String} acao_corretiva - ação corretiva do inconfome
   * @param {String} data_correcao - dataque inconforme foi corrigido
   */
  estornaAcaoCorretiva(id:number, item:number, emissao:String, hora:Time, acao_corretiva:string, data_correcao:String){

    //Alocando em memória o inconforme recebido.
    let inconforme = new Inconforme( id, 
                                     null,
                                     item, 
                                     null,                                 
                                     emissao, 
                                     hora, 
                                     null, 
                                     data_correcao,
                                     acao_corretiva
                                    );

    if ( !( inconforme.getAcaoCorretiva() && inconforme.getDataCorrecao() ) ){

      this.setMensagemAviso("Inconforme não foi corrigido, sendo assim não pode ser feito estorno.")
      return;
    }

    this.inscricao = this.inconformeService.estornaAcaoCorretiva(inconforme)
                                           .subscribe( 
                                                        result =>{                                                                     
                                                                    this.getAll();
                                                                  },
                                                        erros => { 
                                                                    this.setErrosApi(erros);
                                                                  }
                                                      );      
  }  

  
  /**
   * @description: Se inscreve no serviço que envia solicitação para API resgatar todos inconformes 
   *               pela data de emissão na base de dados.
   */  
  getInconformesPorEmissao(){

    if(this.pesquisa.trim() == ""){

        this.getAll();
    }else{
                                             
        let dataEmissao = this.pesquisa.substring(0,2) + "-" + this.pesquisa.substring(3,5) +"-" + this.pesquisa.substring(6,10);

        this.inconformeService.getInconformesPorEmissao(dataEmissao).subscribe(

                result => {
                            this.resultadoApi = result;
                            this.inconformes  = this.resultadoApi.registros;        
                          },
                error => {
                            this.setErrosApi(error);
                         }
        );
    }
  }


  /**
   * @description: Se inscreve no serviço que envia solicitação para API excluir frequência na base de dados.
   * @param frequencia, frequencia à ser salva na base de dados.
   */
  // excluiFrequencia(frequencia : Frequencia){

  //   this.inscricao = this.frequenciaService.deletaFrequencia(frequencia).subscribe(

  //     result => {
  //                 this.getAll();
  //               },
  //     error => {
  //                 this.setErrosApi(error);
  //              }
  //   );
  // }


  /**
   * @description função seta conteudo da variavel erroApi, ela faz uso da varivel estática [ ela incrementa a countErros]
   *              para que a mensagem sempre seja alterada e assim ouvida pelo ngOnChanges da tela-mensagem
   * @param error error ocasionado na aplicação. 
   */
  setErrosApi(error){

    this.mensagemAviso = null;
    this.errosApi = error + " /countErros: " + BrowserInconformeComponent.countErros++;
    console.log(this.errosApi);
  }

  /**
   * @description - Aciona modal para apresentar mensagem de aviso para usuário.
   * @param mensagem mensgem que deve ser apresentada.
   */
  setMensagemAviso(mensagem:string){

    this.errosApi = null;
    this.mensagemAviso = mensagem +  " /message: " + BrowserInconformeComponent.countErros++;
    console.log(this.mensagemAviso);
  }

}
