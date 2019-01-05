// COMPONETES PADRÕES
import { Component, OnInit   } from '@angular/core';
import { Router } from '@angular/router';
// COMPONENTES PERSONALIZDOS
import { Frequencia          } from './../Model/frequencia';

@Component({
  selector: 'app-frequencia',
  templateUrl: './../view/frequencia.component.html',
  styleUrls: [
    './../view/frequencia.component.css',
    './../../global/view/estilo-global-crud.css',
  ]
})
export class FrequenciaComponent implements OnInit {
    
  //TAMANHO DOS CAMPOS 
  private SIZE_ID        = 4;
  private SIZE_DESCRICAO = 15;

  private frequencia:Frequencia = new Frequencia();
  private frequecias:Frequencia[]   = [];

  constructor(private router:Router) {
    /**
     * @TODO desenvolver...
     */
  }
  
  ngOnInit() { }
  
  /**
   * @description Envia solicitação para salvar frequência no BD
   */
  private salvaFrequencia(){
    
    this.frequecias.push(this.frequencia);
    this.frequencia = new Frequencia();
  }

  /**
   * @description: fecha tela de inclusão e volta para a tela de browser.
   * */
  private fechaTela(){
   
    if(window.confirm("Se fechar as informações serão perdidas, deseja realmente fechar ? ")){
      this.router.navigateByUrl("browser-frequencia");
    }
  }

}