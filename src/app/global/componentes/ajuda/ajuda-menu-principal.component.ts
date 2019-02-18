import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ajuda-menu-principal',
  templateUrl: './../../view/ajuda/ajuda-menu-principal.component.html',
  styleUrls: [
    './../../view/ajuda/ajuda-menu-principal.component.css'
  ]
})
export class AjudaMenuPrincipalComponent implements OnInit {

  // IDENTIFICADOR DO MODAL
  private idModal = "modalAjudaMenuPrincial";
  // COMPOSIÇÃO DO MODAL
  private textoTitulo: string = "QualyS";
  private textoDefinicao: string = "";
  private textoAdicional: string = "";
  private textoImportante01: string = "";
  private textoObservacao01: string = "";
  private textoImportante02: string = "";
  private textoObservacao02: string = "";
  private campos: string[][] = [];
  
  constructor() { 

    this.textoDefinicao += "Bem vindo ao QualyS. Nosso objetivo é ajuda-lo com os programas de " +
                           "qualidade exigidos pelos órgãos regulamentadores SIF ( Sistema de inspeção federal ) " +
                           "e ANVISA ( Agência nacional de vigilância sanitária )."

    this.textoAdicional += "Para navegar pelo sistema clique nas opções posicionadas na parte superior da tela. Cada " +
                           "tela do sistema contém uma ajuda correpondente para auxiliá-lo. Esperamos que tenha uma ótima experiência! "
  }

  ngOnInit() {  }

}
