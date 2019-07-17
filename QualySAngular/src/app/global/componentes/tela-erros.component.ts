import { Component, OnInit, OnChanges,SimpleChanges , Input } from '@angular/core';


/**
 * @description: Componente fornece uma tela de erros (modal) para apresentar para o usuario
 * @Input {String} ( mensagemErro ) - String contendo mensagem de erro ocorrido na aplicação
 */
@Component({
  selector: 'tela-erros',
  templateUrl: './../view/tela-erros.component.html',
  styleUrls: [
    './../view/tela-erros.component.css'
  ]
})
export class TelaErrosComponent implements OnInit, OnChanges {

  @Input() mensagemErro:string = "" 

  constructor() { }
  
  ngOnInit() { }
  
  //Fica escutando alterações no conteudo na mensagem
  //caso encontre. Aciona o modal 
  ngOnChanges(  changes: SimpleChanges ){

    this.acionaModalErro();
  }

    /**
   * @description: Aciona/Exibe o modal de erro via javascript ( faz uso de JQuery do bootstrap ).
   * @see https://getbootstrap.com/docs/4.0/components/modal/
   */
  private acionaModalErro(){
    $("#modalErro").modal();
  }

  /**
  *  @description: Fecha o modal de erro via javascript ( faz uso de JQuery do bootstrap ).
  *  @see https://getbootstrap.com/docs/4.0/components/modal/
  */
  private fechaModaErro(){
    $('#modalErro').modal('hide');
    this.mensagemErro="";
  }
}
