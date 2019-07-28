import { Component, OnInit, Input } from '@angular/core';


/**
 * @description: Componente fornece uma tela/modal de Ajuda padrão. 
 * @Input {string} ( idModal ) - ID do do modal que será criado.
 * @Input {string} ( textoTitulo ) - Titulo da Ajuda
 * @Input {string} ( textoDefinicao ) - Texto contendo uma explicação do que se trata a rotina, posicionado após o titulo.
 * @Input {string} ( textoAdicional ) - Texto adicional à ajuda, posicionado após o textoDefinição
 * @Input {string} ( textoImportante01 ) - Texto 01 classificado como importante, posicionado após o texto adicional e antes do quadro de campos
 * @Input {string} ( textoImportante02 ) - Texto 02 classificado como importante, posicionado após o quadro de campos
 * @Input {string} ( textoObservacao01 ) - Texto 01 classificado como observação, posicionado antes do texto adicional e antes do quadro de campos
 * @Input {string} ( textoObservacao02 ) - Texto 02 classificado como observação, posicionado após o quadro de campos
 * @Input {array} ( campos ) - Array bidimensional de string, contendo o nome do campo e uma explicação exemplo de um campo - Exemplo CAMPO['ID']['Código identificador']
 * @Input {boolean} ( mostraAjudaBloqueado ) - flag indicando se deve ou não mostra ajuda para os registros bloqueados. Defaul é false.
 * 
 * @example
 *    $("#NOME_DO_ID").modal()  //O nome do id passado no databinding, será utilizado para acionar a Ajuda
 *  */
@Component({
  selector: 'tela-ajuda',
  templateUrl: './../../view/ajuda/tela-ajuda.component.html',
  styleUrls: [
    './../../view/ajuda/tela-ajuda.component.css',
  ]
})
export class TelaAjudaComponent implements OnInit {
  
  // COMPOSIÇÃO DO MODAL
  @Input() textoTitulo:string="";
  @Input() textoDefinicao:string="";
  @Input() textoAdicional:string="";
  @Input() textoImportante01:string="";
  @Input() textoObservacao01:string="";
  @Input() textoImportante02:string="";
  @Input() textoObservacao02:string="";
  @Input() campos: string[][]=[];
  @Input() mostraAjudaBloqueado:boolean = false;
  // IDENTIFICADORES E CONFIGURAÇÕES DO MODAL
  @Input() idModal = "modalAjudaMenuPrincial";
  private  idModalTitle = this.idModal+"Title";

  constructor() { }

  ngOnInit() { }

}
