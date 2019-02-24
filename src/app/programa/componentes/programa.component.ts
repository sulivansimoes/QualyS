// COMPONENTES PADRÕES
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// COMPONENTES PERSONALIZADOS
import { Programa   } from './../model/programa';

@Component({
  selector: 'app-programa',
  templateUrl: './../view/programa.component.html',
  styleUrls: [
    './../view/programa.component.css',
    './../../global/view/estilo-global-crud.css',
    './../../global/view/icones.css'
  ]
})
export class ProgramaComponent implements OnInit {

  //TAMANHO MAXIMO DE CAMPOS
  private SIZE_ID        = 4;
  private SIZE_DESCRICAO = 60;
  private SIZE_SIGLA     = 8;
  private SIZE_VERSAO    = 3;


  private programa: Programa = new Programa();
  private programas: Programa[] = [];
  
  constructor(private router:Router) {
    /**
     * @todo desenvolver...
     */
  }

  ngOnInit() { }

  /**
   * @description Envia solicitação para salvar programa no BD
   */
  private salvaPrograma() {
    this.programas.push(this.programa);
    alert("Salvou programa!");
    console.log(this.programas);
  }

  /**
   * @description: fecha tela de inclusão e volta para a tela de browser.
   * */
  private fechaTela(){
   
    if(window.confirm("Se fechar as informações serão perdidas, deseja realmente fechar ? ")){
      this.router.navigateByUrl("browser-programa");
    }
  }
}