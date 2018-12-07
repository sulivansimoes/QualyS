import { Component, OnInit } from '@angular/core';

import { Local } from './../Model/local';

@Component({
  selector: 'app-local',
  templateUrl: './../view/local.component.html',
  styleUrls: [
    './../view/local.component.css' , 
    './../../global/view/estilo-global-crud.css'
  ]
})
export class LocalComponent implements OnInit {

  private local:Local = new Local();
  private locais:Local[] = [];
    
  constructor() { }

  ngOnInit() { }

  /**
   * Resumo: Salva novo local.
   */
  salvaLocal(){
    //TODO
  }

  teste02(){
    alert("chamando função de local");
  }

}