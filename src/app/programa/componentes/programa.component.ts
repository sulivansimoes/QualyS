// COMPONENTES PADRÕES
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// COMPONENTES PERSONALIZADOS
import { Programa   } from './../model/programa';
import { Frequencia } from './../../frequencia/model/frequencia';
import { parseObjectsToArray } from 'src/app/global/funcoes/functionsComuns';

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
  private SIZE_ID_FREQUENCIA = 4;

  private programa: Programa = new Programa();
  private programas: Programa[] = [];
  
  private cabecalhoTabelaFrequencia = [["ID"],["DESCRIÇÃO"]];
  private frequencias:Frequencia[]=[ new Frequencia(1,'DIARIA'), new Frequencia(2,'SEMANAL') ];
  private frequenciasFiltradas:any[]= parseObjectsToArray( this.frequencias ) ;

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
 
  /**
   * @description: Pesquisa/Filtra registros de acordo com conteúdo informado pelo usuário e os prove no modal de pesquisa.
   * @param {string} filtro - conteudo a ser pesquisado 
   */ 
  private pesquisaFrequencia(filtro:string){

    if(filtro && filtro.trim() != ""){
      this.frequenciasFiltradas  = this.frequenciasFiltradas.filter( f => f[0] == filtro         || //Código
                                                                          f[1].startsWith(filtro)); //Descrição
    }else{
      this.frequenciasFiltradas = parseObjectsToArray(this.frequencias);
    }
  }

  /**
   * @description Preenche input da frequencia de acordo com o clique que o usuário deu sobre determinada frequencia.
   * @param dado id da frequencia que foi seleciona (clicada) pelo usuário
   */
  private itemSelecionado(dado:any){
    this.programa.setIdFrequencia(dado[0]);
    this.fechaModalPesquisa();
  }

  /**
   * @description: Aciona/Exibe o modal de pesquisa via javascript ( faz uso de JQuery do bootstrap ).
   * @see https://getbootstrap.com/docs/4.0/components/modal/
   */
  private acionaModalPesquia() {
    $("#modalPesquisa").modal();
  }

  /**
  *  @description: Fecha o modal de pesquisa via javascript ( faz uso de JQuery do bootstrap ).
  *  @see https://getbootstrap.com/docs/4.0/components/modal/
  */
  private fechaModalPesquisa() {
    $('#modalPesquisa').modal('hide');
  }
}
