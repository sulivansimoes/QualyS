import { Component, OnInit } from '@angular/core';

import { Frequencia } from './../Model/frequencia';

@Component({
  selector: 'app-frequencia',
  templateUrl: './../view/frequencia.component.html',
  styleUrls: [
    './../view/frequencia.component.css',
    './../../global/view/estilo-global-crud.css'
  ]
})
export class FrequenciaComponent implements OnInit {
    
  // TAMANHO DOS CAMPOS 
  private SIZE_ID        = 4;
  private SIZE_DESCRICAO = 15;
  
  private frequencia:Frequencia = new Frequencia();
  private frequecias:Frequencia[] = [];



  constructor() { }

  ngOnInit() {
  }

  private salvaFrequencia(){
    this.frequecias.push(this.frequencia);
    this.frequencia = new Frequencia();
    console.log(this.frequecias);
  }

  private fechaTela(){
    alert("fecha tela frequencia.")
  }

  //TODO
  //DESENVOLVER LÓGICA.
}