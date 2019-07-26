// COMPONENTES PADRÕES
import { Component, OnInit  } from '@angular/core';
import { Subscription       } from 'rxjs';
import { Router             } from '@angular/router';
// COMPONENTES PERSONALIZADOS
import { Frequencia         } from './../../frequencia/model/frequencia';
import { FrequenciaService  } from './../../frequencia/model/frequencia.service';
import { Local              } from './../../local/model/local';
import { Programa           } from './../../programa/model/programa';
import { CadastroFormulario } from '../model/cadastro-formulario';
import { ItemFormulario     } from './../model/item-formulario';
import { parseObjectsToArray} from 'src/app/global/funcoes/functionsComuns';
import { ProgramaService    } from './../../programa/model/programa.service';
import { LocalService       } from './../../local/model/local.service';
import { CadastroFormularioService } from './../model/cadastro-formulario.service';


@Component({
  selector: 'app-cadastro-formulario',
  templateUrl: './../view/cadastro-formulario.component.html',
  styleUrls: [
    './../view/cadastro-formulario.component.css',
    './../../global/view/estilo-global-crud.css',
    './../../global/view/icones.css'
  ]
})
export class CadastroFormularioComponent implements OnInit {

  // TAMANHO MAXIMO DE CAMPOS
  private SIZE_DESCRICAO = 40;
  private SIZE_PROGRAMA  = 4;
  private SIZE_LOCAL     = 4;
  private SIZE_FREQUENCIA= 4;
  // CONTROLE DAS CONSULTAS
  private pesquisa_programa   = false;
  private pesquisa_frequencia = false;
  private pesquisa_local      = false;
  private idPesquisaLocal     = "pesquisa_local";
  private idPesquisaPrograma  = "pesquisa_programa";
  private idPesquisaFrequencia= "pesquisa_frequencia";
  private CONSULTA_LOCAL      = 1;      //Flag da consulta
  private CONSULTA_PROGRAMA   = 2;
  private CONSULTA_FREQUENCIA = 3
  // ARRAYS USADOS NOS MODAIS DE CONSULTA
  private cabecalhoConsulta         = null;
  private programas:Programa[]      = [];
  private programasFiltrados:any[]  = []; 
  private locais:Local[]            = [];
  private locaisFiltrados:any[]     = []; 
  private frequencias:Frequencia[]  = [];
  private frequenciasFiltradas:any[]= [];
  
  private inscricao     = new Subscription;
  private resultadoApi  = null;
  private errosApi      = null;

  private formulario: CadastroFormulario = null;
  private itemFormulario: ItemFormulario = null;
  private formularios:[]=[];
  private itens:ItemFormulario[]= [];


  static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere  

  constructor(private router:Router,
              private localservice:LocalService,
              private programaService:ProgramaService,
              private frequenciaService:FrequenciaService,
              private formularioService:CadastroFormularioService
             ) { 
  }

  ngOnInit() { 

    if(this.getCadastroFormulario().getQuantidadeItens() === 0){
      this.adicionaItem();
    }
  }


  /**
   * destruo a inscrição e todos os arrays ao fechar.
   */
  ngOnDestroy(){
    
    this.inscricao.unsubscribe();
    this.resultadoApi    = null;
    this.locais          = null;
    this.locaisFiltrados = null;
    this.programas       = null;
    this.programasFiltrados   = null;
    this.frequencias          = null;
    this.frequenciasFiltradas = null;
    this.cabecalhoConsulta    = null;
  }


 /**
   * @description Envia solicitação para salvar programa no BD
   */
  private salvarFormulario(){

    this.formularioService.salvaFormulario(this.formulario).subscribe(

          result => {
                        this.resultadoApi    = result;
                        // this.locais          = this.resultadoApi.registros;     
                        // this.locais          = parseObjectsToArray ( this.locais );   
                        // this.locaisFiltrados = this.locais;
                    },
          error => {
                        this.setErrosApi(error);
                    }
    );
  }

   /**
   * @description: fecha tela de inclusão e volta para a tela de browser.
   * */
  private fechaTela(){
   
    if(window.confirm("Se fechar as informações serão perdidas, deseja realmente fechar ? ")){
      this.router.navigateByUrl("browser-cadastro-formulario");
    }
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
  private deletaItem(/*item:ItemFormulario*/){
   
    // this.getCadastroFormulario().removeItem(item);
  }

  /**
   * @description Retorna instancia de CadastroFormulário alocado.
   * @return {CadastroFormulario} - instancia alocada em memória
   */
  private getCadastroFormulario()/*:CadastroFormulario*/{
    if( this.formulario == null ){
      this.formulario = new CadastroFormulario();
    }
    return this.formulario;
  }

  
  /**
   * @description Retorna instancia de ItemFormulario alocado
   * @return {ItemFormulario}  - instancia alocada em memória
   */
  private getItemFormulario()/*:ItemFormulario*/{
    if( this.itemFormulario == null ){
      this.itemFormulario = new ItemFormulario()
    }
    return this.itemFormulario;
  }


  /**
   * @description função verifica qual a consulta deve ser chamada faz devidas tratativas e acional tal ação.
   * @param {Number} consulta, número que identifica a consulta que deverá ser acionada.
   */
  private pesquisa(consulta:number){

    switch(consulta){

      case this.CONSULTA_PROGRAMA :

          this.pesquisa_programa   = true;
          this.pesquisa_frequencia = false;
          this.pesquisa_local      = false;

          this.acionaModalPesquisa(this.idPesquisaPrograma);
      break;

      case this.CONSULTA_FREQUENCIA :

          this.pesquisa_programa   = false;
          this.pesquisa_frequencia = true;
          this.pesquisa_local      = false;

          this.acionaModalPesquisa(this.idPesquisaFrequencia);
      break;

      case this.CONSULTA_LOCAL :

          this.pesquisa_programa   = false;
          this.pesquisa_frequencia = false;
          this.pesquisa_local      = true;

          this.acionaModalPesquisa(this.idPesquisaLocal);
      break;
    
      default :
          console.log("Erro inesperado! consulta '"+consulta+"' chamada na função pesquisa() não foi encontrada.");
      break;
    }
  } 


  /**
   * @description: Aciona/Exibe o modal de pesquisa via javascript ( faz uso de JQuery do bootstrap ).
   * @param {String} - idModal, id do modal que será acionado.
   * @see https://getbootstrap.com/docs/4.0/components/modal/
   */
  private acionaModalPesquisa(idModal:string):void {

    switch(idModal){

      case this.idPesquisaPrograma:

          this.constroiConsultaPrograma();
      break;
      case this.idPesquisaFrequencia :

          this.constroiConsultaFrequencia();
      break;
      case this.idPesquisaLocal :

          this.constroiConsultaLocal();
      break;
    }

    $("#"+idModal).modal();
  }


  /**
  * @description: Fecha o modal de pesquisa via javascript ( faz uso de JQuery do bootstrap ).
  * @param {String} - idModal, id do modal que será fechado.
  * @see https://getbootstrap.com/docs/4.0/components/modal/
  */
  private fechaModalPesquisa(idModal:string):void {

    $("#"+idModal).modal('hide');
  }


  /**
   * @description: Função monta o array frequecias, frequeciasFiltrados e cabecalhoTabelaFrequencia para inicializar
   *               a tela de consulta quando a consulta das frequecias for acionada.
   */
  private constroiConsultaFrequencia(){

    this.cabecalhoConsulta = [["ID"],["DESCRIÇÃO"]];

    this.inscricao = this.frequenciaService.getAllFrequencias().subscribe(

      result => {
                  this.resultadoApi         = result;
                  this.frequencias          = this.resultadoApi.registros;     
                  this.frequencias          = parseObjectsToArray ( this.frequencias );   
                  this.frequenciasFiltradas = this.frequencias;
                },
      error => {
                  this.setErrosApi(error);
               }
    );
  }


  /**
   * @description: Pesquisa/Filtra registros de acordo com conteúdo informado pelo usuário e os prove no modal de pesquisa.
   * @param {string} filtro - conteudo a ser pesquisado 
   */ 
  private pesquisaFrequencia(filtro:string){

    if(filtro && filtro.trim() != ""){

      this.frequenciasFiltradas  = this.frequenciasFiltradas.filter( f => f[0] == filtro         ||          //Código
                                                                     f[1].startsWith(filtro.toUpperCase())); //Descrição
    }else{

      this.frequenciasFiltradas = this.frequencias;
    }
  }


  /**
   * @description Preenche input do local de acordo com o clique que o usuário deu sobre determinada frequencia.
   * @param dado id do local que foi seleciona (clicada) pelo usuário
   */
  private itemFrequenciaSelecionada(dado:any){

    this.formulario.setIdFrequencia(dado[0]);
    this.formulario.setDescricaoFrequencia(dado[1]);
    this.fechaModalPesquisa(this.idPesquisaFrequencia);
  }


  /**
   * @description: Função monta o array locais, locaisFiltrados e cabecalhoTabelaLocal para inicializar
   *               a tela de consulta quando a consulta de locais for acionada.
   */
  private constroiConsultaLocal(){

    this.cabecalhoConsulta = [["ID"],["DESCRIÇÃO"]];

    this.inscricao = this.localservice.getAllLocais().subscribe(

      result => {
                  this.resultadoApi    = result;
                  this.locais          = this.resultadoApi.registros;     
                  this.locais          = parseObjectsToArray ( this.locais );   
                  this.locaisFiltrados = this.locais;
                },
      error => {
                  this.setErrosApi(error);
               }
    );
  }


  /**
   * @description: Pesquisa/Filtra registros de acordo com conteúdo informado pelo usuário e os prove no modal de pesquisa.
   * @param {string} filtro - conteudo a ser pesquisado 
   */ 
  private pesquisaLocal(filtro:string){

    if(filtro && filtro.trim() != ""){

      this.locaisFiltrados  = this.locaisFiltrados.filter( f => f[0] == filtro                      ||  //Código
                                                                f[1].startsWith(filtro.toUpperCase())); //Descrição
    }else{

      this.locaisFiltrados = this.locais;
    }
  }


  /**
   * @description Preenche input do local de acordo com o clique que o usuário deu sobre determinado local.
   * @param dado id do local que foi seleciona (clicada) pelo usuário
   */
  private itemLocalSelecionado(dado:any){

    this.formulario.setIdLocal(dado[0]);
    this.formulario.setDescricaoLocal(dado[1]);
    this.fechaModalPesquisa(this.idPesquisaLocal);
  }


  private constroiConsultaPrograma(){

    this.cabecalhoConsulta= [["ID"],["DESCRIÇÃO"]];

    this.inscricao = this.programaService.getAllProgramas().subscribe(

      result => {
                  this.resultadoApi      = result;
                  this.programas         = this.resultadoApi.registros;     
                  this.programas         = parseObjectsToArray ( this.programas );   
                  this.programasFiltrados= this.programas;
                },
      error => {
                  this.setErrosApi(error);
               }
    );
  }


  /**
   * @description: Pesquisa/Filtra registros de acordo com conteúdo informado pelo usuário e os prove no modal de pesquisa.
   * @param {string} filtro - conteudo a ser pesquisado 
   */ 
  private pesquisaPrograma(filtro:string){

    if(filtro && filtro.trim() != ""){

      this.programasFiltrados  = this.programasFiltrados.filter( f => f[0] == filtro                      ||  //Código
                                                                      f[1].startsWith(filtro.toUpperCase())); //Descrição
    }else{
      
      this.programasFiltrados = parseObjectsToArray(this.programas);
    }
  } 
  

  /**
   * @description Preenche input do local de acordo com o clique que o usuário deu sobre determinado programa.
   * @param dado id do local que foi seleciona (clicada) pelo usuário
   */
  private itemProgramaSelecionado(dado:any){

    this.formulario.setIdPrograma (dado[0]);
    this.formulario.setDescricaoPrograma(dado[1]);
    this.fechaModalPesquisa(this.idPesquisaPrograma);
  } 


  /**
   * @description função seta conteudo da variavel erroApi, ela faz uso da varivel estática [ ela incrementa a countErros]
   *              para que a mensagem sempre seja alterada e assim ouvida pelo ngOnChanges da tela-mensagem
   * @param error error ocasionado na aplicação. 
   */
  setErrosApi(error){

    this.errosApi = error + " /countErros: " + CadastroFormularioComponent.countErros++  ;
    console.log(this.errosApi);
  }

}
