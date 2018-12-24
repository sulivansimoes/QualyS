import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as bootstrap from 'bootstrap';

/**
 * @description: Componente fornece uma tela de consulta de dados, padrão. 
 * @Input {Array<any>} ( cabecalhoTabela ) - Array contendo as colunas de cabecalho da tabela.
 * @Input {Array<any>} ( tabelaDeDados   ) - Array contendo todos os dados que irão compor a tabela para pesquisar.   
 * @Output{EventEmitter<any>} ( botaoPesquisarClicado ) - Recebe um evento (Função) que será acionado quando clicar no botão Pesquisar. 
 * @Output{EventEmitter<any>} ( itemSelecionadoClicado ) - Recebe um evento (Função) que será acionado quando um item da tabela for clicado.
 */
@Component({
  selector: 'app-tela-consulta-padrao',
  templateUrl: './../view/tela-consulta-padrao.component.html',
  styleUrls: [
    './../view/tela-consulta-padrao.component.css'
  ]
})
export class TelaConsultaPadraoComponent implements OnInit {

  @Input()  cabecalhoTabela:Array<any>= [];
  @Input()  tabelaDeDados:Array<any>  = [];
  @Output() itemSelecionadoClicado:EventEmitter<any> = new EventEmitter();
  @Output() botaoPesquisarClicado: EventEmitter<any> = new EventEmitter();

  private inputPesquisa:string = "";
    
  constructor() {}
  
  ngOnInit() {}
 
  /**
   * @description: Aciona/Exibe o modal de pesquisa via javascript ( faz uso de JQuery do bootstrap ).
   * @see https://getbootstrap.com/docs/4.0/components/modal/
   */
  private acionaModalPesquia(){
      $("#modalPesquisa").modal();
  }

  /**
  *  @description: Fecha o modal de pesquisa via javascript ( faz uso de JQuery do bootstrap ).
  *  @see https://getbootstrap.com/docs/4.0/components/modal/
  */
  private fechaModalPesquisa(){
    $('#modalPesquisa').modal('hide');
  }

}
