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

  private programa:Programa = new Programa();

  constructor() { }

  ngOnInit() { }

  private salvaPrograma(){
    alert("Salvou programa!")
  }

  private fechaTela(){
    alert("Fechou tela programa!");
  }
}
