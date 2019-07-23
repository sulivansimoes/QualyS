import { Component, OnInit, OnChanges,SimpleChanges , Input } from '@angular/core';


/**
 * @description: Componente fornece uma tela genécrica (modal) para apresentar mensagens para o usuario
 * @Input {String} ( titulo ) - titulo do modal (Janela)
 * @Input {String} ( mensagemErro )   - String contendo mensagem do erro à ser apresentado ao usuário
 * @Input {String} ( mensagemAviso )  - String contendo mensagem do aviso à ser apresentado ao usuário
 * @Input {String} ( mensagemSucesso )- String contendo mensagem do sucesso à ser apresentado ao usuário
 */
@Component({
  selector: 'tela-mensagem',
  templateUrl: './../view/tela-mensagem.component.html',
  styleUrls: [
    './../view/tela-mensagem.component.css'
  ]
})
export class TelaMensagemComponent implements OnInit, OnChanges {

  @Input() titulo:string        = "" ;
  @Input() mensagemErro:string  = "" ;
  @Input() mensagemAviso:string = "" ;
  @Input() mensagemSucesso:string ="";

  constructor() { }
  
  ngOnInit() { }
  
  //Fica escutando alterações no conteudo na mensagem
  //caso encontre. Aciona o modal 
  ngOnChanges(  changes: SimpleChanges ){

    this.acionaModalMensagem();
  }


  /**
   * @description: Aciona/Exibe o modal via javascript ( faz uso de JQuery do bootstrap ).
   * @see https://getbootstrap.com/docs/4.0/components/modal/
   */
  private acionaModalMensagem(){
    $("#modalMensagem").modal();
  }


  /**
   *  @description: Fecha o modal via javascript ( faz uso de JQuery do bootstrap ).
   *  @see https://getbootstrap.com/docs/4.0/components/modal/
   */
  private fechaModalMensagem(){

    $('#modalMensagem').modal('hide');
  }
}
