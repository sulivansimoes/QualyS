// COMPONENTES PADRÕES
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
// COMPONENTES PERSONALIZADOS


/**
 * @description: Componente fornece uma tela que possui um text-area para preencher com os dados, padrão. 
 * @Input  {String} ( titulo ) - String contendo titulo  do modal.
 * @Input  {String} ( subTitulo ) - String contendo subTitulo do modal.
 * @Input  {String} ( mensagemBox ) - Array contendo todos os dados que irão compor a tabela para pesquisar.   
 * @Input  {String} ( placeholder ) - String contendo o placeholder do text-area da tela.
 * @Input  {number} ( tamanhoTexto ) - Tamanho maximo que o box irá permitir que seja escrito. Default é 30.
 * @Input  {Boolean} ( controleChamada ) - BooleanVariavel de controle para chamar a tela (modal), basta ficar negando a mesma para que o modal seja chamado, conteudo default é false.
 * @Output {EventEmitter<any>} ( botaoConfirmarClicado ) - Recebe um evento (Função) que será acionado quando clicar no botão Confirmar. 
 */
@Component({
  selector: 'tela-box',
  templateUrl: './../view/tela-box.component.html',
  styleUrls: [
    './../view/tela-box.component.css'
  ]
})
export class TelaBoxComponent implements OnInit, OnChanges {

  
  @Input() titulo:String     = "" ;
  @Input() subTitulo:String  = "" ;
  @Input() mensagemBox:String= "" ; 
  @Input() placeholder:String= "" ;
  @Input() tamanhoTexto:number= 30;
  @Input() controleChamada:Boolean=false; //usada como um flag, ele é negado toda hora para ser observado na alteração e dessa forma ser chamado.
  @Output() botaoConfirmarClicado :EventEmitter<any> = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  //Fica escutando alterações na variavel controleChamada
  //caso encontre. Aciona o modal 
  ngOnChanges(  changes: SimpleChanges ){

    //Se a mensagem não foi alterada 
    //então garanto que seu conteudo seja apresentado
    //sem informação no text-area
    if( ! changes.mensagemBox ){

      this.mensagemBox = "";
    }

    this.acionaModalTelaBox();
  }


  /**
   * @description: Aciona/Exibe o modal via javascript ( faz uso de JQuery do bootstrap ).
   * @see https://getbootstrap.com/docs/4.0/components/modal/
   */
  private acionaModalTelaBox(){
    $("#modalTelaBox").modal();
  }


  /**
   *  @description: Fecha o modal via javascript ( faz uso de JQuery do bootstrap ).
   *  @see https://getbootstrap.com/docs/4.0/components/modal/
   */
  private fechaModalTelaBox(){

    $('#modalTelaBox').modal('hide');
    this.mensagemBox = "";
  }  

}
