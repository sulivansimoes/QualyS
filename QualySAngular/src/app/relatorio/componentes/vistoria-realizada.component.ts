// COMPONENTES PADRÕES
import { Component, OnInit } from '@angular/core';
// COMPONENTES PERSONALIZADOS
import { formataData, parseObjectsToArray } from 'src/app/global/funcoes/functionsComuns';
import { CadastroFormulario               } from './../../cadastro-formulario/model/cadastro-formulario';
import { RespostaFormularioService        } from './../../resposta-formulario/model/resposta-formulario.service';
import { CadastroFormularioService        } from './../../cadastro-formulario/model/cadastro-formulario.service';
import { msgFiltrosNaoPreenchidos         } from 'src/app/global/funcoes/mensagensPadroes';
import { msgNaoHaInformacoes              } from 'src/app/global/funcoes/mensagensPadroes';
import { msgDataInicialMenorqueFinal      } from 'src/app/global/funcoes/mensagensPadroes';
// COMPONENTES DE TERCEIROS
import * as jsPDF from 'jspdf'


/**
 * @description Componente fornece o relatório de vistorias realizadas de um determinado formulário.
 * @see http://www.rotisedapsales.com/snr/cloud2/website/jsPDF-master/docs/jspdf.js.html
 */

@Component({
  selector: 'relatorio-vistoria-realizada',
  templateUrl: './../view/vistoria-realizada.component.html',
  styleUrls: [
    './../view/vistoria-realizada.component.css',
    './../../global/view/estilo-global-crud.css',
    './../../global/view/icones.css'
  ]
})
export class VistoriaRealizadaComponent implements OnInit {

  private formularios:CadastroFormulario[] = [];
  private formulariosFiltrados:any[]       = []; 
  private cabecalhoConsulta                = null;
  private errosApi                         = null;
  private mensagemAviso                    = null;
  private mensagemInfo                     = null;
  private idPesquisaFormulario             = 'idPesquisaFormularioEmVistoriasRealizadas';
  private daEmissao                        = null;
  private ateEmissao                       = null;
  private formulario                       = null;
  static countErros                        = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere  


  constructor(private respostaFormularioService: RespostaFormularioService,
              private cadastroFormularioService : CadastroFormularioService
             ) { }

  ngOnInit() {
  }


  private geraRelatorio() {

    let resultadoApi = null;

    //declarção da intancia do pdf 
    let documento = new jsPDF({

      orientation: 'p',
      unit: 'mm',
      format: 'a4',
    });


    //------------------------------------------------------
    // VALIDANDO INFORMAÇÕES
    //------------------------------------------------------
    if( !this.daEmissao  ||
        !this.ateEmissao ||
        !this.formulario ){ 

       this.setMensagemAviso(msgFiltrosNaoPreenchidos);
       return;
    }

    if(this.daEmissao > this.ateEmissao){
      this.setMensagemAviso(msgDataInicialMenorqueFinal);
      return;
    }

    // se increve no serviço e recupera vistorias realizadas
    this.respostaFormularioService.getVistoriasRealizadas(this.daEmissao,this.ateEmissao,this.formulario)
        .subscribe(
                    result => {
                                resultadoApi = result;
                                if(resultadoApi.linhas_afetadas > 0){

                                  this.processaInformacoesRelatorio(documento, resultadoApi.registros);
                                  documento.output("dataurlnewwindow");
                                }else{
                                  this.setMensagemInfo(msgNaoHaInformacoes)
                                }
                            },
                    erros => {
                                this.setErrosApi(erros);
                                return null;
                              }
        );
  }



  /**
   * @description: Função separa as vistorias para organizar e depois manda imprimir.
   * @param {jsPDF} documento, intancia do pdf a qual será trabalhada.
   * @param {*} vistorias, resultset da consulta realizada no banco de dados com as vistorias
   */
  private processaInformacoesRelatorio(documento, vistorias) {

    let vistorias_aux = [];
    let vistoria      = [];
    let umaVistoria   = true;

    // Percorre todas as vistorias
    for (let index in vistorias) {

      
        // Carrega os itens da vistoria no array
        vistoria.push(vistorias[index]);
      
        // Verifica se próxima posição existe
        if(vistorias.length > (Number.parseInt(index) + 1)) {

            // Verifica se mudou a vistoria
            if(vistorias[index].emissao != vistorias[Number.parseInt(index) + 1].emissao ||
               vistorias[index].hora    != vistorias[Number.parseInt(index) + 1].hora    ){

                // Guarda a vistoria corrente em uma posição especifica da matriz.
                vistorias_aux.push(vistoria);
                console.log("vistoria = ", vistoria);
                vistoria = [];
                umaVistoria = false;
            }
        }
    }

    //Tratativa quando for somente uma vistoria
    if (umaVistoria) {

        vistoria      = [];
        vistorias_aux = [];

        for (let index in vistorias) {
          vistoria.push(vistorias[index]);
        }
        vistorias_aux.push(vistoria);
        console.log("Há somente uma vistoria", vistorias_aux)

    }else{
      // Se não tiver somente um vistoria, eu pego a ultima que não entrou no if de verifica se mudou vistoria
      vistorias_aux.push(vistoria);
    }
    console.log("vistorias_aux", vistorias_aux);


    // Inicia impressão relatorio
    for(let index in vistorias_aux) {

      this.imprimeCabecalho(documento, vistorias_aux[index][0]);
      this.imprimeCabecalhoItens(documento);
      this.imprimeItens(documento, vistorias_aux[index]);
      this.imprimeRodape(documento, vistorias_aux[index][0]);

      if(Number.parseInt(index)+1 < vistorias_aux.length){
        documento.addPage();
      }
    }
    console.log("vistorias_aux = ", vistorias_aux);
  }


  /**
   * @description: Imprime o cabeçalho do relatório
   * @param {jsPDF} documento, intancia do pdf a qual será trabalhada.
   * @param {*} vistoria, resultset da consulta realizada no banco de dados com as vistorias, contendo somente a primeira linha da vistoria
   */
  private imprimeCabecalho(documento, vistoria) {

    let imagemLogo = this.getImagem();

    documento.addImage(imagemLogo, 'JPEG', 5, 2, 40, 28);

    // FAZENDO EM LINHAS HORIZONTAIS
    documento.rect( 0,  0,  50, 32, "S");
    documento.line(50,  8, 210,  8, 'S');
    documento.line(50, 16, 210, 16, 'S');
    documento.line(50, 24, 210, 24, 'S');
    documento.line(50, 32, 210, 32, 'S');

    // FAZENDO EM LINHAS VERTICAIS
    documento.line( 90, 16,  90, 32, 'S');
    documento.line(130, 16, 130, 32, 'S');
    documento.line(170, 16, 170, 32, 'S');

    documento.setFont("Roman");
    documento.setFontStyle("bold");
    documento.setFontSize(14);
    documento.text("LISTA VERIFICAÇÃO", 100, 7);

    documento.setFontSize(12);

    documento.text(vistoria.nome_formulario, 58, 14);

    // TEXTOS FIXOS
    documento.setFontStyle("normal");
    documento.text("Data Vistoria",  58, 22);
    documento.text("Data Vigência",  98, 22);
    documento.text("Data Revisão" , 140, 22);
    documento.text("Versão"       , 182, 22);

    // INFORMAÇÕES DO BD
    documento.text(formataData(vistoria.emissao)      , 58, 30);
    documento.text(formataData(vistoria.data_vigencia), 98, 30);
    documento.text(formataData(vistoria.data_revisao), 140, 30);
    documento.text(vistoria.versao                   , 182, 30);

    documento.setFontStyle("italic");
    documento.line(0, 50, 210, 50, 'S');
    documento.text(vistoria.oficio.substring(0  , 101), 3, 38);
    documento.text(vistoria.oficio.substring(101, 198), 3, 42);
    documento.text(vistoria.oficio.substring(198, 295), 3, 46);

    // LINHAS HORIZONTAL
    documento.line(0, 58, 210, 58, 'S');
    documento.line(0, 66, 210, 66, 'S');
    documento.line(0, 74, 210, 74, 'S');

    documento.setFontStyle("normal");
    documento.text("Frequência: "  + vistoria.frequencia.substring(0, 1) + vistoria.frequencia.substring(1).toLowerCase(), 3, 56);
    documento.text("Local: "       + vistoria.local.substring(0, 1)      + vistoria.local.substring(1).toLowerCase()     , 3, 64);
    documento.text("Colaborador: " + vistoria.colaborador, 3, 72);
  }


  /**
   * @description: Imprime o cabeçalho dos itens do relatório.
   * @param documento, intancia do pdf a qual será trabalhada.
   */
  private imprimeCabecalhoItens(documento) {

    // linha cabeçalho de itens    
    documento.setFillColor("#c9c9c9");
    documento.rect(0, 74, 210, 7, "S");
    // documento.line(0, 82, 210, 82, 'S');

    documento.setFontStyle("bold");
    documento.setFontSize(10);
    documento.text("ITENS A VERIFICAR: ", 3, 80);
    documento.text("CONFORME ", 152, 80);
    documento.text("NÃO CONFORME ", 178, 80);

  }


  /**
   * @description Imprime os itens do relatório
   * @param documento, intancia do pdf a qual será trabalhada.
   * @param vistoria,resultset da consulta realizada no banco de dados com os itens da vistoria realizada, 
   */
  private imprimeItens(documento, vistoria) {

    // Coordenadas p/impressão
    let x1_line = 0;
    let y1_line = 82;
    let x2_line = 210;
    let x_text1 = 3;
    let y_text1 = 74;
    let x_text2 = 160;
    let x_text3 = 190;
    let y_text2 = 78;

    let pergunta = null;

    documento.setFontStyle("normal");
    documento.setFontSize(12);

    console.log(vistoria)

    //todos itens vistoriados     
    for (let index in vistoria) {

      pergunta = vistoria[index].pergunta_respondida.substring(0, 1) +
        vistoria[index].pergunta_respondida.substring(1).toLowerCase() + " ?";

      documento.line(x1_line, y1_line += 12, x2_line, y1_line, 'S');

      documento.text(Number.parseInt(index) + 1 + ". " + pergunta.substr(0, 81), x_text1, y_text1 += 12);
      documento.text(pergunta.substr(82), x_text1, y_text1 + 5);

      if (vistoria[index].conforme) {
        documento.text("X", x_text2, y_text2 += 12);
      } else {
        documento.text("X", x_text3, y_text2 += 12);
      }
    }

    // CRIANDO LINHAS VERTICAIS
    documento.line(148, 74, 148, y1_line, 'S');
    documento.line(175, 74, 175, y1_line, 'S');
  }


  /**
   * @description Imprime o rodapé do relatório
   * @param documento, intancia do pdf a qual será trabalhada.
   */
  private imprimeRodape(documento, vistoria) {

    documento.addImage(vistoria.imgbase64, 'JPEG', 12, 266, 85, 18);

    documento.line(10, 285, 100, 285, 'S');
    documento.text("Assinatura colaborador ", 30, 292);
  }


  getImagem() {
    return "data:image/png;base64,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"
  }


  /**
   * @description Aciona o modal de pesquisa de formulario
   */
  private acionaPesquisaFormulario(){
    this.constroiConsultaFormulario();
    $("#"+this.idPesquisaFormulario).modal();
  }


  /**
   * @description: Pesquisa/Filtra registros de acordo com conteúdo informado pelo usuário e os prove no modal de pesquisa.
   * @param {string} filtro - conteudo a ser pesquisado 
   */ 
  private pesquisaFormulario(filtro:string){

    if(filtro && filtro.trim() != ""){

      this.formulariosFiltrados  = this.formulariosFiltrados.filter( f => f[0] == filtro                  ||  //Código
                                                                     f[1].startsWith(filtro.toUpperCase() )); //Descrição
    }else{
      
      this.formulariosFiltrados = parseObjectsToArray(this.formularios);
    }
  }  
  
  
  /**
   * @description Preenche input do formulario de acordo com o clique que o usuário deu sobre determinada frequencia.
   * @param dado id do formulario que foi seleciona (clicada) pelo usuário
   */
  private itemFormularioSelecionado(dado:any){

    this.formulario = dado[0];
    this.fechaModalPesquisa();
  }


  /**
   * @description: Função monta o array locais, locaisFiltrados e cabecalhoTabelaLocal para inicializar
   *               a tela de consulta quando a consulta de locais for acionada.
   */
  private constroiConsultaFormulario(){

    let resultadoApi
    this.cabecalhoConsulta = [["ID"],["DESCRIÇÃO"]];

    this.cadastroFormularioService.getAllCabecalhoFormularios().subscribe(

        result => {
                    resultadoApi        = result;
                    this.formularios    = resultadoApi.registros;     
                    this.formularios    = parseObjectsToArray ( this.formularios );   
                    this.formulariosFiltrados = this.formularios;
                  },
        error => {
                    this.setErrosApi(error);
                }
      );
  }

  /**
   * @description: Fecha o modal de pesquisa via javascript ( faz uso de JQuery do bootstrap ).
   * @param {String} - idModal, id do modal que será fechado.
   * @see https://getbootstrap.com/docs/4.0/components/modal/
   */
  private fechaModalPesquisa():void {

    $("#"+this.idPesquisaFormulario).modal('hide');
  }


  /**
   * @description Seta mensagem para apresentar para usuário.
   * @param mensagem mensagem de aviso
   */
  private setMensagemAviso(mensagem:String){
    this.errosApi     = null;
    this.mensagemInfo = null;
    this.mensagemAviso = mensagem + " /message "+ VistoriaRealizadaComponent.countErros++;
    console.log(this.mensagemAviso);
  }


  /**
   * @description função seta conteudo da variavel erroApi, ela faz uso da varivel estática [ ela incrementa a countErros]
   *              para que a mensagem sempre seja alterada e assim ouvida pelo ngOnChanges da tela-mensagem
   * @param error error ocasionado na aplicação. 
   */
  private setErrosApi(error:any){
    this.mensagemAviso = null;
    this.mensagemInfo  = null;
    this.errosApi = error + " /countErros: " + VistoriaRealizadaComponent.countErros++  ;
    console.log(this.errosApi);
  }

 
  /**
   * @description Seta mensagem para apresentar para usuário.
   * @param mensagem mensagem de aviso
   */  
  private setMensagemInfo(mensagem:String){
    this.errosApi      = null;
    this.mensagemAviso = null;
    this.mensagemInfo = mensagem + " /message: " + VistoriaRealizadaComponent.countErros++  ;
    console.log(this.mensagemInfo);
  }
}
