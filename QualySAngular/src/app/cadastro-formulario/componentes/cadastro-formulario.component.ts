// COMPONENTES PADRÕES
import { Component, OnInit      } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription           } from 'rxjs';
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
import { msgCamposNaoPreenchidos   } from 'src/app/global/funcoes/mensagensPadroes';


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
  private mensagemAviso = null;
  private camposObrigatorios             = false;
  private formulario: CadastroFormulario = null;

  static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere  

  constructor(private router:Router,
              private route: ActivatedRoute,
              private localservice:LocalService,
              private programaService:ProgramaService,
              private frequenciaService:FrequenciaService,
              private formularioService:CadastroFormularioService
             ) { 
  }


  ngOnInit() { 

   
      //Recupera o conteudo dos parametros e inicializa campos.
      //Também resgata a instancia da inscrição.
      this.inscricao = this.route.queryParams.subscribe(
          (queryParams: any) => {

              this.getCadastroFormulario().setId( queryParams['id'] );

              //Se estiver alterando inicializa todos inputs
              if( this.getCadastroFormulario().getId() ){
                
                  this.findFormularioPorId( queryParams['id'] );
              }else{
        
                  this.adicionaItem();
              }                
         }
      );
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


  private salva(){

      if( this.isEmpty() ){

        this.camposObrigatorios = true;
        this.setMensagemAviso();
        return;

      }else{

        this.camposObrigatorios = false;
      }

      if(this.getCadastroFormulario().getId()){
        
        // this.atualizaFrequencia();
      }else{
        
        this.salvarFormulario()
      }
  }


 /**
   * @description Envia solicitação para o service salvar o formulário.
   */
  private salvarFormulario(){

    this.formularioService.salvaFormulario(this.formulario).subscribe(

          result => {
                        this.resultadoApi    = result;
                        this.formulario      = new CadastroFormulario();
                        alert(this.resultadoApi.mensagem);
                    },
          error => {
                        this.setErrosApi(error);
                    }
    );
  }



  /**
   * @description Envia solicitação para service localizar o formulario (itens e cabecalho) pelo id
   * @param {number} id - id do formulario a ser localizado. 
   */
  private findFormularioPorId(id: number){

    this.formularioService.findFormularioPorId(id).subscribe(

        result => {
                      this.resultadoApi    = result;
                      
                      // correndo em todos itens e adicionado ao formulario para aparecer na tela.
                      for (let i = 0; i < this.resultadoApi.linhas_afetadas; i++){

                        this.formulario.addItem(new ItemFormulario( null,
                                                                    this.resultadoApi.registros[i].item,
                                                                    this.resultadoApi.registros[i].pergunta,
                                                                    this.resultadoApi.registros[i].bloqueado
                                                                  ));
                      }
                  },
        error => {
                      this.setErrosApi(error);
                  }
    );
  }


  /**
   * @description Inclui uma nova linha ( vazia ) ao fomulário para que possa ser preenchida
   */
  private adicionaItem(){

    this.getCadastroFormulario().addItem(new ItemFormulario( null,     //IdCabeçalho
                                                             null,     //Item
                                                             null,     //Pergunta
                                                             null) );  //Bloqueado
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
   * @return {CadastroFormulario} - Instância alocada em memória
   */
  private getCadastroFormulario()/*:CadastroFormulario*/{

    if( this.formulario == null ){

      this.formulario = new CadastroFormulario();
    }

    return this.formulario;
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

    this.getCadastroFormulario().setIdFrequencia(dado[0]);
    this.getCadastroFormulario().setDescricaoFrequencia(dado[1]);
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

    this.getCadastroFormulario().setIdLocal(dado[0]);
    this.getCadastroFormulario().setDescricaoLocal(dado[1]);
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

    this.getCadastroFormulario().setIdPrograma (dado[0]);
    this.getCadastroFormulario().setDescricaoPrograma(dado[1]);
    this.fechaModalPesquisa(this.idPesquisaPrograma);
  } 


  /**
   *@description  Valida se campos estão vazios.
   *@returns true caso algum campo esteja vazio, false caso contrário.
   */
  private isEmpty(){

    let itens        =  this.getCadastroFormulario().getItens();
    let temCampoVazio = false;
    
    console.log( this.getCadastroFormulario().getIdFrequencia() )
    //Validando cabeçalho
    temCampoVazio = this.getCadastroFormulario().getDescricao()        == undefined ||                     
                    this.getCadastroFormulario().getDescricao()        == null      ||
                    this.getCadastroFormulario().getDescricao().trim() ==''         || 
                        
                    this.getCadastroFormulario().getIdFrequencia()     == undefined || 
                    this.getCadastroFormulario().getIdFrequencia()     == null      ||

                    this.getCadastroFormulario().getIdPrograma()       == undefined || 
                    this.getCadastroFormulario().getIdPrograma()       == null      ||

                    this.getCadastroFormulario().getIdLocal()          == undefined || 
                    this.getCadastroFormulario().getIdLocal()          == null      ||

                    this.getCadastroFormulario().isBloqueado()          == undefined || 
                    this.getCadastroFormulario().isBloqueado()          == null       ? true : false;

    //Validando itens   
    // for(let i = 0; this.formulario.getQuantidadeItens(); i++){

    //   if( itens[i].getPergunta() == null      ||
    //       itens[i].getPergunta() == undefined ||
          
    //       itens[i].isBloqueado() == null      ||
    //       itens[i].isBloqueado() == undefined
    //      ){

    //       temCampoVazio = true;
    //       break;
    //   }
    // }

    return temCampoVazio;
  }


  /**
   * @description: fecha tela de inclusão e volta para a tela de browser.
   */
  private fechaTela(){
   
    if(window.confirm("Se fechar as informações serão perdidas, deseja realmente fechar ? ")){
      this.router.navigateByUrl("browser-cadastro-formulario");
    }
  }


  /**
   * @description função seta conteudo da variavel mensagemAviso, ela faz uso da varivel estática [ ela incrementa a countErros]
   *              para que a mensagem sempre seja alterada e assim ouvida pelo ngOnChanges da tela-erros
   */
  setMensagemAviso(){

    this.errosApi = null;
    this.mensagemAviso = msgCamposNaoPreenchidos + " message: " + CadastroFormularioComponent.countErros++;
    console.log(this.mensagemAviso);
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
