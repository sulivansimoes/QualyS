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
    return "data:image/png;base64,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";
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
