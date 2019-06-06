// COMPONENTES PADRÕES
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// COMPONENTES PERSONALIZADOS
import { Local } from './../Model/local';

@Component({
  selector: 'app-local',
  templateUrl: './../view/local.component.html',
  styleUrls: [
    './../view/local.component.css' , 
    './../../global/view/estilo-global-crud.css',
  ]
})
export class LocalComponent implements OnInit {

  private local:Local = new Local();
  private locais:Local[] = [];
    
  constructor(private router:Router) { }

  ngOnInit() { }

  /**
   * Resumo: Salva novo local.
   */
  private salvaLocal(){
    alert("Salvou local");
    
  }

  /**
   * @description: fecha tela de inclusão e volta para a tela de browser.
   * */
  private fechaTela(){
   
    if(window.confirm("Se fechar as informações serão perdidas, deseja realmente fechar ? ")){
      this.router.navigateByUrl("browser-local");
    }
  }

}