// COMPONENTES PADRÕES
import { Component, OnInit  } from '@angular/core';
// COMPONENTES PERSONALIZADOS
import { Local } from './../../local/model/local';
import { Programa } from './../../programa/model/programa';
import { CadastroFormulario } from '../model/cadastro-formulario';
import { ItemFormulario     } from './../model/item-formulario';
import { parseObjectsToArray} from 'src/app/global/funcoes/functionsComuns';

@Component({
  selector: 'app-cadastro-formulario',
  templateUrl: './../view/cadastro-formulario.component.html',
  styleUrls: [
    './../view/cadastro-formulario.component.css',
    './../../global/view/estilo-global-crud.css'
  ]
})
export class CadastroFormularioComponent implements OnInit {

  //TAMANHO MAXIMO DE CAMPOS
  private SIZE_ID        = 4;
  private SIZE_DESCRICAO = 40;
  private SIZE_PROGRAMA  = 4;
  private SIZE_LOCAL     = 4;

  private formulario: CadastroFormulario = null;
  private itemFormulario: ItemFormulario = null;
  private formularios:[]=[];
  private itens:ItemFormulario[]= [];

  // USADO NOS MODAIS DE CONSULTA
  private cabecalhoTabelaPrograma = [["ID"],["DESCRIÇÃO"]];
  private programas:Programa []=[ new Programa(1,'PROGRAMA 1'), new Programa(2,'PROGRAMA 2') ];
  private programasFiltrados:any[]= parseObjectsToArray ( this.programas ) ; 
  private cabecalhoTabelaLocal = [["ID"],["DESCRIÇÃO"]];
  private locais:Local []=[ new Local(1,'DEPOSITO MATERIA PRIMA'), new Local(2,'VESTIARIO') ];
  private locaisFiltrados:any[]= parseObjectsToArray ( this.locais ) ; 

  constructor() { 
   /**
    * @todo desenvolver...
    */
  }

  ngOnInit() { 

    if(this.getCadastroFormulario().getQuantidadeItens() === 0){
      this.adicionaItem();
    }
  }

 /**
   * @description Envia solicitação para salvar programa no BD
   */
  private salvarFormulario(){

    /**
     * @todo desenvolver...
     */
  }

  /**
   * @description: fecha tela de inclusão.
   */
  private fechaTela(){
    /**
     * @todo desenvolver...
     */
  }

  /**
   * @description Inclui uma nova linha ( vazia ) ao fomulário para que possa ser preenchida
   */
  private adicionaItem(){

    let ultimoItem = this.getCadastroFormulario().getQuantidadeItens();

    this.getCadastroFormulario().addItem(new ItemFormulario( null,            //IdCabeçalho
                                                             ultimoItem  + 1, //Item
                                                             null,            //Pergunta
                                                             null) );         //Bloqueado

    console.log(this.getCadastroFormulario().getItens());                                                             
  }

  /**
   * @description Deleta o item ( pergunta ) do fomulário
   * @param {ItemFormulario} item - Item à ser excluído do formulário.
   */
  private deletaItem(item:ItemFormulario){
   
    this.getCadastroFormulario().removeItem(item);
  }

  /**
   * @description Retorna instancia de CadastroFormulário alocado.
   * @return {CadastroFormulario} - instancia alocada em memória
   */
  private getCadastroFormulario():CadastroFormulario{
    if( this.formulario == null ){
      this.formulario = new CadastroFormulario();
    }
    return this.formulario;
  }

  /**
   * @description Retorna instancia de ItemFormulario alocado
   * @return {ItemFormulario}  - instancia alocada em memória
   */
  private getItemFormulario():ItemFormulario{
    if( this.itemFormulario == null ){
      this.itemFormulario = new ItemFormulario()
    }
    return this.itemFormulario;
  }

   /**
   * @description Preenche input do local de acordo com o clique que o usuário deu sobre determinado local.
   * @param dado id do local que foi seleciona (clicada) pelo usuário
   */
  private itemLocalSelecionado(dado:any){
    this.formulario.setIdLocal(dado[0]);
    this.fechaModalPesquisa();
  }

  /**
   * @description Preenche input do Programa de acordo com o clique que o usuário deu sobre determinado Programa.
   * @param dado id do programa que foi seleciona (clicada) pelo usuário
   */
  private itemProgramaSelecionado(dado:any){
    this.formulario.setIdPrograma(dado[0]);
    this.fechaModalPesquisa();
  }

 /**
   * @description: Pesquisa/Filtra registros de acordo com conteúdo informado pelo usuário e os prove no modal de pesquisa.
   * @param {string} filtro - conteudo a ser pesquisado 
   */ 
  private pesquisaLocal(filtro:string){

    if(filtro && filtro.trim() != ""){
      this.locaisFiltrados  = this.locaisFiltrados.filter( f => f[0] == filtro         || //Código
                                                                f[1].startsWith(filtro)); //Descrição
    }else{
      this.locaisFiltrados = parseObjectsToArray(this.locais);
    }
  }

  /**
   * @description: Pesquisa/Filtra registros de acordo com conteúdo informado pelo usuário e os prove no modal de pesquisa.
   * @param {string} filtro - conteudo a ser pesquisado 
   */ 
  private pesquisaPrograma(filtro:string){

    if(filtro && filtro.trim() != ""){
      this.programasFiltrados  = this.programasFiltrados.filter( f => f[0] == filtro         || //Código
                                                                      f[1].startsWith(filtro)); //Descrição
    }else{
      this.programasFiltrados = parseObjectsToArray(this.programas);
    }
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
