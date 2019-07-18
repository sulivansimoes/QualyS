//COMPONENTES PADRÕES
import { Component, OnInit } from '@angular/core';
import { Subscription      } from 'rxjs';
//COMPONENTES PERSONALIZADOS
import { Frequencia        } from './../model/frequencia';
import { FrequenciaService } from './../model/frequencia.service';

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
  
  public inscricao     = new Subscription;
  public resultadoApi  = null;
  public errosApi      = null;
  public paginaAtual   = 1;     // Dizemos que queremos que o componente quando carregar, inicialize na página 1.
  public frequencias:Frequencia[] = []; 

  static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere

  constructor(private frequenciaService : FrequenciaService) {

     this.getAll() ;
  }


  ngOnInit() { }


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
   * @description: Se inscreve no serviço que envia solicitação para API excluir frequência na base de dados.
   * @param frequencia, frequencia à ser salva na base de dados.
   */
  excluiFrequencia(frequencia : Frequencia){

    this.inscricao = this.frequenciaService.deletaFrequencia(frequencia).subscribe(

      result => {
                  this.getAll();
                },
      error => {
                  this.setErrosApi(error);
                }
    )
    
  }

  /**
   * @description função seta conteudo da variavel erroApi, ela faz uso da varivel estática [ ela incrementa a countErros]
   *              para que a mensagem sempre seja alterada e assim ouvida pelo ngOnChanges da tela-erros
   * @param error error ocasionado na aplicação. 
   */
  setErrosApi(error){

    this.errosApi = error + " /countErros: " + BrowserFrequenciaComponent.countErros++  ;
    console.log(this.errosApi);
  }
}
