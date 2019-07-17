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

  public frequencias:Frequencia[] = []; 
  public resultadoApi  = null;
  public errosApi      = null;
  public paginaAtual   = 1;     // Dizemos que queremos que o componente quando carregar, inicialize na página 1.
  public inscricao     = Subscription;

  static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere

  constructor(private frequenciaService : FrequenciaService) {

     this.getAll() ;
  }

  ngOnInit() { }

  ngOnDestroy(){
    //fazer o inscricao receber o sbscribe e depois destruir a incrição
    // this.inscricao.;
  }

  getAll(){

    this.frequenciaService.getAllFrequencias().subscribe(

        result => {
                    this.resultadoApi = result;
                    this.frequencias  = this.resultadoApi.registros;        
                  },
        error => {
                    this.setErrosApi(error);
                 }
    );
  }


  excluiFrequencia(frequencia : Frequencia){

    this.frequenciaService.deletaFrequencia(frequencia).subscribe(

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
