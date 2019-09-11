// COMPONENTES PADÕES
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

/**
 * @description: Componente fornece uma tela de modal com dois botões que serão implementados a critério do desenvolvedor
 * @Input  {String} ( idModal )       - Id do modal que será acionado, sempre tentar passar um id único para não gerar conflitos no DOM
 * @Input  {String} ( titulo )        - String contendo titulo  do modal.
 * @Input  {String} ( mensagemModal ) - String contendo a mensgem que irá compor o modal
 * @Input  {String} ( nomeBotao01 )   - String contendo o nome do botão que o desenvolvedor irá implementar
 * @Input  {String} ( nomeBotao02 )   - String contendo o nome do botão que o desenvolvedor irá implementar
 * @Input  {Boolean} ( controleChamada ) - Boolean Variavel de controle para chamar a tela (modal), basta ficar negando a mesma para que o modal seja chamado, conteudo default é false.
 * @Output {EventEmitter<any>} ( botao01Clicado ) - Recebe um evento (Função) que será acionado quando clicar no botão que o desenvolvedor implementou. 
 * @Output {EventEmitter<any>} ( botao02Clicado ) - Recebe um evento (Função) que será acionado quando clicar no botão que o desenvolvedor implementou. 
 */
@Component({  
  selector: 'tela-dois-botoes',
  templateUrl: './../view/tela-dois-botoes.component.html',
  styleUrls: [
    './../view/tela-dois-botoes.component.css'
  ]
})
export class TelaDoisBotoesComponent implements OnInit, OnChanges {

  @Input() idModal    :String   = "";
  @Input() tituloModal:String   = "";
  @Input() mensagemModal:String = ""; 
  @Input() nomeBotao01:String   = "";     
  @Input() nomeBotao02:String   = "";
  @Input() controleChamada:Boolean=false; //usada como um flag, ele é negado toda hora para ser observado na alteração e dessa forma ser chamado.
  @Output() botao01Clicado :EventEmitter<any> = new EventEmitter();
  @Output() botao02Clicado :EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  //Fica escutando alterações na variavel controleChamada
  //Caso encontre. Aciona o modal 
  ngOnChanges(  changes: SimpleChanges ){
    
    this.acionaModal();
  }


  /**
   * @description: Aciona/Exibe o modal via javascript ( faz uso de JQuery do bootstrap ).
   * @see https://getbootstrap.com/docs/4.0/components/modal/
   */
  private acionaModal(){

    $( '#'+this.idModal ).modal();
  }


  /**
   *  @description: Fecha o modal via javascript ( faz uso de JQuery do bootstrap ).
   *  @see https://getbootstrap.com/docs/4.0/components/modal/
   */
  private fechaModal(){

    $(  '#'+this.idModal ).modal('hide');    
  } 

}
