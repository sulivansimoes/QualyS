import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ajuda-inconforme',
  templateUrl: './../../view/ajuda/ajuda-inconforme.component.html',
  styleUrls: [
    './../../view/ajuda/ajuda-inconforme.component.css'
  ]
})
export class AjudaInconformeComponent implements OnInit {

  // IDENTIFICADOR DO MODAL
  private idModal = "modalAjudaCadastroInconformes";
  // COMPOSIÇÃO DO MODAL
  private textoTitulo: string = "Inconforme";
  private textoDefinicao: string = "";
  private textoAdicional: string = "";
  private textoImportante01: string = "";
  private textoObservacao01: string = "";
  private textoImportante02: string = "";
  private textoObservacao02: string = "";
  private campos: string[][] = [];

  constructor() {
    
    this.textoDefinicao += "Nesta rotina são apresentadas todas as inconformidades geradas, de acordo com as repostas dos formulários " +
                           " respondidas pelos responsáveis das vistorias"; 

    this.textoAdicional += "Para apontar a correção de uma inconformidade, localize a mesma e clique no botão de 'Prancheta' da mesma. "+
                           "Caso o apontamento seja feito de forma errada a mesma pode ser estornada clicando no botão de 'X'  da mesma. ";
                           
    this.textoImportante01 += "Uma inconformidade não pode ser excluída devido ter sido originada de uma vistoria. Caso a mesma for originada "+
                              "indevidamente deverá ser feito o apontamento da correção da mesma colocando o motivo no campo 'Ação corretiva'."; 


    this.campos.push(["Programa", "Código do Programa que foi orginado a inconformidade ( este campo já vem preenchido )"]);
    this.campos.push(["Item"    , "Item ( pergunta ) do formulário  que foi originado a inconformidade ( este campo já vem preenchido )"]);
    this.campos.push(["Emissão Inconformidade", "Data em que inconformidade foi originada ( este campo já vem preenchido )"]);
    this.campos.push(["Hora Inconformidade"   , "Hora em que inconformidade foi originada ( este campo já vem preenchido )"]);
    this.campos.push(["Data correção" , "Data em que a inconformidade foi corrigida."]);
    this.campos.push(["Inconformidade", "Descrição da inconfomidade descrita pelo usuário resonsável pela vistoria ( este campo já vem preenchido )"]);
    this.campos.push(["Ação corretiva", "Descrição da ação corretiva que foi tomada para corrigir inconformidade."]);

  }

  ngOnInit() { }

}
