import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ajuda-cadastro-local',
  templateUrl: './../../view/ajuda/ajuda-cadastro-local.component.html',
  styleUrls: [
    './../../view/ajuda/ajuda-cadastro-local.component.css'
  ]
})
export class AjudaCadastroLocalComponent implements OnInit {

  // IDENTIFICADORES E CONFIGURAÇÕES DO MODAL
  private idModal = "modalAjudaCadastroLocal";
  private idModalTitle = this.idModal+"Title";

  // COMPOSIÇÃO DO MODAL
  private textoTitulo:string="Local";
  private textoDefinicao:string="";
  private textoAdicional:string="";
  private textoImportante01:string="";
  private textoObservacao01:string="";
  private textoImportante02:string="";
  private textoObservacao02:string="";
  private campos: string[][]=[]

  constructor() { 

    this.textoDefinicao += "Nesta rotina são cadastrados todos os locais utlizados no sistema. " +
                           "Todo formulário de perguntas necessita ser associado à um local que corresponde " +
                           "ao lugar que o fomulário em questão faz referência. "
    
    this.textoImportante01 += "IMPORTANTE: Obrigatóriamente todo fomulário cadastrado no sistema deve ser associado a um local, caso contrário, o " +
                              "Cadastro de Fomulários não será concluído. "

    this.campos.push( ["ID"        , "Código identificador do Local, este campo é preenchido automaticamente pelo sistema."]);
    this.campos.push( ["Descrição" , "Descrição do Local cadastrado, por exemplo: DEPOSITO DE MATERIA PRIMA, BANHEIRO, TACHO etc.."]);
  }

  ngOnInit() {  }

}
