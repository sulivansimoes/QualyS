import { Frequencia } from './../../frequencia/model/frequencia';
import { Component, OnInit } from '@angular/core';

import { Programa } from './../model/programa';

@Component({
  selector: 'app-programa',
  templateUrl: './../view/programa.component.html',
  styleUrls: [
    './../view/programa.component.css',
    './../../global/view/estilo-global-crud.css'
  ]
})
export class ProgramaComponent implements OnInit {
  
  //TAMANHO MAXIMO DE CAMPOS
  private SIZE_ID        = 4;
  private SIZE_DESCRICAO = 60;
  private SIZE_SIGLA     = 8;
  private SIZE_VERSAO    = 3;
  private SIZE_ID_FREQUENCIA = 4;

  private programa:Programa = new Programa();
  private programas:Programa[] = [];

  private frequencias:Frequencia[] = [];
  
  constructor() { 
    /**
     * @todo desenvolver
     */
  }

  ngOnInit() { }

  private salvaPrograma(){
    this.programas.push(this.programa);
    alert("Salvou programa!");
    console.log(this.programas);
  }

  private fechaTela(){
    alert("Fechou tela programa!");
  }
}
