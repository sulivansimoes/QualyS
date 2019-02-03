import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ajuda-resposta-formulario',
  templateUrl: './../../view/ajuda/ajuda-resposta-formulario.component.html',
  styleUrls: [
    './../../view/ajuda/ajuda-resposta-formulario.component.css'
  ]
})
export class AjudaRespostaFormularioComponent implements OnInit {

  // IDENTIFICADOR DO MODAL
  private idModal = "modalAjudaCadastroRespostaFormulario";
  // COMPOSIÇÃO DO MODAL
  private textoTitulo: string = "Resposta Formulário";
  private textoDefinicao: string = "";
  private textoAdicional: string = "";
  private textoImportante01: string = "";
  private textoObservacao01: string = "";
  private textoImportante02: string = "";
  private textoObservacao02: string = "";
  private campos: string[][] = [];

  constructor() {

    this.textoDefinicao += "O usuário deverá responder o formulário de acordo com a vistoria feita.";
      
    this.campos.push(["Data Emissão", "Data em que a vistoria foi feita."]);
    this.campos.push(["Hora Emissão", "Hora em que a vistoria foi feita."]);
    this.campos.push(["Conforme / Não Conforme", "Deverá ser respondido se a situação da vistoria referente a pergunta está em conformidade ou não."]);
    this.campos.push(["Inconformidade", "Caso a pergunta seja marcada como 'Não conforme' será apresentado uma tela para descrever a inconformidade."]);

    this.textoImportante02 += "Caso a pergunta seja marcada como 'Não conforme' o usuário deverá descrever a inconformidade!"
  }

  ngOnInit() { }

}
