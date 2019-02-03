import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ajuda-cadastro-programa',
  templateUrl: './../../view/ajuda/ajuda-cadastro-programa.component.html',
  styleUrls: [
    './../../view/ajuda/ajuda-cadastro-programa.component.css'
  ]
})
export class AjudaCadastroProgramaComponent implements OnInit {

  // IDENTIFICADOR DO MODAL
  private idModal = "modalAjudaCadastroPrograma";
  // COMPOSIÇÃO DO MODAL
  private textoTitulo: string = "Programa";
  private textoDefinicao: string = "";
  private textoAdicional: string = "";
  private textoImportante01: string = "";
  private textoObservacao01: string = "";
  private textoImportante02: string = "";
  private textoObservacao02: string = "";
  private campos: string[][] = [];

  constructor() {

    this.textoDefinicao += "As empresas que manipulam produtos de origem animal bem como, laticínios, frigorificos e "+
                           "manipuladores de produtos apícolas obrigatóriamente necessitam fazer implantação de programas "+
                           "de qualidade exigidos pelos órgãos regulamentadores SIF ( Sistema de inspeção federal ) e pela ANVISA "+
                           "( Agência nacional de vigilância sanitária ). Exemplo: BPF, PPHO, APPCC e PAC's ";

    this.textoImportante01 += "IMPORTANTE: A premissa para concluir este cadastro é ter previamente cadastrado a 'Frequência' a ser utilizada.";
    
    this.textoObservacao01+= "Nesta rotina são cadastrados todos programas exigidos pelos órgãos regulamentadores.";
        
    this.campos.push(["ID"           , "Código identificador do Programa, este campo é preenchido automaticamente pelo sistema."]);
    this.campos.push(["Descrição"    , "Descrição do programa cadastrado, por exemplo: PROGRAMA DE AUTOCONTROLE 01, PROCEDIMENTO PADRONIZADO DE HIGIENE OPERACIONAL."]);
    this.campos.push(["Sigla"        , "Sigla do programa cadastrado, por exemplo: PAC-1, PPHO."]);
    this.campos.push(["Data Vigência", "Data em que o programa passou a ser vigente."]);
    this.campos.push(["Data Revisão" , "Última data em que o programa foi revisado."]);
    this.campos.push(["Frequência"   , "Código da frequência em que o programa ( formulários do programa ) em questão deve ser respondido."]);
    this.campos.push(["Versão"       , "Versão do programa, por exemplo: 001, 003, etc."]);
    this.campos.push(["Legislação Referência", "Legislação referência do programa"]);
    this.campos.push(["Bloqueado"    , "Indica se o programa está bloqueado ( ativo ) ou não na empresa, caso esteja bloqueado não será permitido o uso do cadastro posteriormente."]);
  
    this.textoObservacao02 += "OBSERVAÇÃO: Todo cadastro de fomulário deve ser associado a um programa, caso contrário, o "+
                              "cadastro de formulário não será concluído.";
  }

  ngOnInit() { }

}
