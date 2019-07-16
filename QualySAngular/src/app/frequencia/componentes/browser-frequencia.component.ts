//COMPONENTES PADRÕES
import { Component, OnInit } from '@angular/core';
//COMPONENTES PERSONALIZADOS
import { Frequencia        } from './../model/frequencia';
import { FrequenciaService } from './../model/frequencia.service';

@Component({
  selector: 'app-browser-frequencia',
  templateUrl: '/../view/browser-frequencia.component.html',
  styleUrls: [
    '/../view/browser-frequencia.component.css',
    './../../global/view/estilo-global-crud.css',
    './../../global/view/icones.css'
  ]
})
export class BrowserFrequenciaComponent implements OnInit {

  frequencias:Frequencia[] = []; 
  resultadoApi  = null;

  public paginaAtual = 1; // Dizemos que queremos que o componente quando carregar, inicialize na página 1.

  constructor(private frequenciaService : FrequenciaService) {

    // for(let i=0; i < 80; i++){

    //   let frequencia = new Frequencia();
  
    //   frequencia.setId(i);
    //   frequencia.setDescricao("teste "+i);
  
    //   this.frequencias.push(frequencia);
    // }
    this.getAll() ;
   
  
   }

  ngOnInit() {
  }

  getAll(){
    this.frequenciaService.getAllFrequencias().subscribe(
      result => {

        this.resultadoApi = result;
        console.log(this.resultadoApi.mensagem);
        this.frequencias  = this.resultadoApi.registros;
      }
    );
  }

 
}
