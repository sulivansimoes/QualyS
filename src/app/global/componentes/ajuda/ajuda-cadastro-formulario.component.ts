import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ajuda-cadastro-formulario',
  templateUrl: './../../view/ajuda/ajuda-cadastro-formulario.component.html',
  styleUrls: [
    './../../view/ajuda/ajuda-cadastro-formulario.component.css'
  ]
})
export class AjudaCadastroFormularioComponent implements OnInit {

  // IDENTIFICADOR DO MODAL
  private idModal = "modalAjudaCadastroFormulario";
  // COMPOSIÇÃO DO MODAL
  private textoTitulo: string = "Formulário";
  private textoDefinicao: string = "";
  private textoAdicional: string = "";
  private textoImportante01: string = "";
  private textoObservacao01: string = "";
  private textoImportante02: string = "";
  private textoObservacao02: string = "";
  private campos: string[][] = [];

  constructor() {

    this.textoDefinicao += "Nesta rotina são cadastrados todos os formulários de perguntas do sistema. " +
                           "O formulário deverá ser respondido pelos responsáveis posteriormente.";

    this.textoImportante01 += "IMPORTANTE: A premissa para concluir este cadastro é ter previamente cadastrado o 'Local', o 'Programa' e a 'Freqência'a ser utilizado."                           
    
    //CABEÇALHO  
    this.campos.push(["ID", "Código identificador do cadastro de formulário, este campo é preenchido automaticamente pelo sistema."]);
    this.campos.push(["Descrição", "Descrição do cadastro de formulário, por exemplo: VISTORIA DEPOSITO EMBALAGEM."]);
    this.campos.push(["Programa", "Código do Programa asssociado ao formulário. ( Clique na 'Lupa' ou pressione a tecla F2 do teclado para pesquisar. )"]);
    this.campos.push(["Local", "Código do Local asssociado ao formulário. ( Clique na 'Lupa' ou pressione a tecla F2 do teclado para pesquisar. )"]);
    this.campos.push(["Frequência"   , "Código da frequência em que o programa ( formulários do programa ) em questão deve ser respondido."]);
    this.campos.push(["Bloqueado", "Indica se o formulário está bloqueado ( ativo ) ou não na empresa, caso esteja bloqueado não será permitido o uso do cadastro posteriormente."]);
    //ITENS
    this.campos.push(["Item", "Código identificador da pergunta do formulário, este campo é preenchido automaticamente pelo sistema."]);
    this.campos.push(["Pergunta", "Pergunta do formulário que deverá ser respondida pelo responsável no momento da vistoria"]);
    this.campos.push(["Bloqueado", "Indica se a pergunta especifica do formulário que deverá ser respondida pelo responsável no momento da vistoria está bloqueada ( Ativa ) ou não na empresa, caso esteja bloqueado não será apresentada no momento de responder o formulário de perguntas."]);
  }

  ngOnInit() { }

}
