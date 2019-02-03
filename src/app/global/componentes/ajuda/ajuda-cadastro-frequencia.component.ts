import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ajuda-cadastro-frequencia',
  templateUrl: './../../view/ajuda/ajuda-cadastro-frequencia.component.html',
  styleUrls: [
    './../../view/ajuda/ajuda-cadastro-frequencia.component.css'
  ]
})
export class AjudaCadastroFrequenciaComponent implements OnInit {

   // IDENTIFICADORES E CONFIGURAÇÕES DO MODAL
   private idModal = "modalAjudaCadastroFrequencia";
   private idModalTitle = this.idModal+"Title";
 
   // COMPOSIÇÃO DO MODAL
   private textoTitulo:string="Frequência";
   private textoDefinicao:string="";
   private textoAdicional:string="";
   private textoImportante01:string="";
   private textoObservacao01:string="";
   private textoImportante02:string="";
   private textoObservacao02:string="";
   private campos: string[][]=[]
 
   constructor() { 
 
     this.textoDefinicao += "Nesta rotina são cadastradas todas as frequências utlizadas no sistema. "+
                            "Todo programa de autocontrole necessita ser respondido em períodos de tempo ( frequência ) "+
                            "Todo programa cadastrado no sistema deve ser associado a uma frequência, caso contrário, o  "+
                            "Cadastro de Programas não será concluído."
     
    //  this.textoImportante01 += "IMPORTANTE: 
                              //  "
//  
     this.campos.push( ["ID"        , "Código identificador da frequência, este campo é preenchido automaticamente pelo sistema."]);
     this.campos.push( ["Descrição" , "Descrição da frêquencia cadastrada, por exemplo: DIARIA, MENSAL etc.."]);
   }

  ngOnInit() { }

}
