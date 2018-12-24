import { Component, OnInit   } from '@angular/core';

import { Frequencia          } from './../Model/frequencia';
import { parseObjectsToArray } from 'src/app/global/funcoes/functionsComuns';

@Component({
  selector: 'app-frequencia',
  templateUrl: './../view/frequencia.component.html',
  styleUrls: [
    './../view/frequencia.component.css',
    './../../global/view/estilo-global-crud.css'
  ]
})
export class FrequenciaComponent implements OnInit {
    
  //TAMANHO DOS CAMPOS 
  private SIZE_ID        = 4;
  private SIZE_DESCRICAO = 15;

  private frequencia:Frequencia = new Frequencia();
  private frequecias:Frequencia[]   = [];

  //Usado no modal de pesquida - TESTE
  private cabecalhoTabela = []
  private frequenciasFiltradas:any[]= [];

  constructor() {
    this.cabecalhoTabela.push(["ID"],["DESCRIÇÃO"]); 
   
  }
  
  ngOnInit() { }
  
  private salvaFrequencia(){
    
    this.frequecias.push(this.frequencia);
    this.frequencia = new Frequencia();

   this.frequenciasFiltradas = ( parseObjectsToArray( this.frequecias ));
   console.log(this.frequecias)
  }

  private fechaTela(){
    alert("fecha tela frequencia.")
  }

  private itemSelecionado(dado:any){
    this.frequencia.setId(dado[0]);
    this.fechaTela();
  }

  //TESTE DA TELA DE CONSULTA
  private pesquisaFrequencia(filtro:string){
    this.frequenciasFiltradas  = this.frequenciasFiltradas.filter( f => f[0].startsWith(filtro) || //Código
                                                                        f[1].startsWith(filtro) ); //Descrição
  }

  //TODO
  //DESENVOLVER LÓGICA.
}