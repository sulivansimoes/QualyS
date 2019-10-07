// COMPOENNTES PADRÕES
import { Component, OnInit, OnDestroy } from '@angular/core';
// COMPONENTES PERSONALIZADOS
import { RespostaFormularioService    } from './../../../resposta-formulario/model/resposta-formulario.service';
import { InconformeService            } from './../../../inconforme/model/inconforme.service';
// COMPONENTES DE TERCEIROS
import { GoogleChartInterface         } from 'ng2-google-charts/google-charts-interfaces';


/**
 * @description: Fornece dois gráficos com informações das vistorias
 * @see https://www.devrandom.it/software/ng2-google-charts/demo/
 * @see https://github.com/gmazzamuto/ng2-google-charts/
 * @see https://www.npmjs.com/package/ng2-google-charts
 */

@Component({
  selector: 'app-home-graficos',
  templateUrl: './../view/home-graficos.component.html',
  styleUrls: [
    './../view/home-graficos.component.css'
  ]
})
export class HomeGraficosComponent implements OnInit, OnDestroy {

  private data = new Date();
  private meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  private anos  = [];
  private dias  = [];
  private mesSelecionado   = true;
  private anoSelecionado   = true;
  private diaSelecionado   = true;
  private dia_escolhido    = this.data.getDate();
  private mes_escolhido    = this.data.getMonth()+1;
  private ano_escolhido    = this.data.getFullYear();
  private resultApi        = null;

  //Variáveis que comportam o objeto dos gráficos
  public columnChart: GoogleChartInterface = {

    chartType: 'ColumnChart',
    dataTable: [],

    options: {
      
      title: 'Inconformes Gerados X Resolvidos X Pendentes',
      width: 600,
      height: 400,
      legend: { position: 'bottom', maxLines: 3 },
      bar: { groupWidth: '75%' },
      vAxis: {title: 'Quantidade',  titleTextStyle: {color: 'black'}},  //legenda vertical
      // hAxis: {title: 'Período',  titleTextStyle: {color: 'black'}},     //legenda na horizontal
      colors: ['#A9A9A9', '#6495ED', '#ec8f6e'], 
    }
  };

  public pieChart: GoogleChartInterface = {
    
    chartType: 'PieChart',
    dataTable: [],

    options: {
      title: 'Vistorias X Inconformes',
      width: 620,
      height: 400,
      legend: { position: 'bottom', maxLines: 3 },
      bar: { groupWidth: '75%' },
      colors: ['#6495ED', '#ec8f6e']     ,
      is3D: false
    },
  };


  constructor(private respostaFormularioService:RespostaFormularioService,
              private inconformeService:InconformeService) { }


  ngOnInit() { 
    
    let data = new Date();
    
    //pegando os dias
    for(let i = 1; i <= 31; i++){
      this.dias.push(i);
    }

    //Pegando os anos [Até 5 anos]
    for(let i = 0; i < 5; i++ ){
     
      this.anos.push( data.getUTCFullYear() );
      data.setFullYear(data.getFullYear() - 1);
    }

    //Pega as infomações dos gráficos
    this.populaDataTablePieChart(true);
    this.populaDataTableColumChart(true);
  }

  ngOnDestroy(){
    this.columnChart = null;
    this.pieChart    = null;
    this.meses       = null;
    this.anos        = null;
    this.dias        = null;
  }


  /**
   * @description: Função requisita ao service as informações necessárias, e popula a propriedade dataTable do columnChart.
   * @param primeiraExecucao, variavel de controle para ver se é aprimeira vez que rotina está sendo acionada, true caso sim.
   */
  private populaDataTableColumChart(primeiraExecucao?:boolean){

    this.inconformeService.getInconformesGeradosResolvidosPendentes(this.ano_escolhido, this.mes_escolhido, this.dia_escolhido)
        .subscribe(
                    result =>{
                                this.resultApi = result;
                                let  inconformes_gerados    = Number.parseInt( this.resultApi.registros[0].inconformes_gerados_periodo );
                                let  inconformes_pendentes  = Number.parseInt( this.resultApi.registros[0].inconformes_pendentes );
                                let  inconformes_resolvidos = Number.parseInt( this.resultApi.registros[0].inconformes_resolvidos );
                                                      
                                this.columnChart.dataTable = [
                                                                ['mes', 'Gerados','Resolvidos', 'Não Resolvidos'],                                                            
                                                                ['Mês'  , inconformes_gerados, inconformes_resolvidos, inconformes_pendentes]                                                         
                                                             ];

                                //Se não for a primeira vez, então vai atualizar.
                                if(!primeiraExecucao){
                                  this.columnChart.component.draw();                                  
                                }                                                               
                             },
                    erros => {
                                console.log(erros)
                             }
                  );
  }


  /**
   * @description: Função requisita ao service as informações necessárias, e popula a propriedade dataTable do pieChart.
   * @param primeiraExecucao, variavel de controle para ver se é aprimeira vez que rotina está sendo acionada, true caso sim.
   */
  private populaDataTablePieChart(primeiraExecucao?:boolean){
    
    this.respostaFormularioService
        .getVistoriasRealizadasEVistoriasComInconformes(this.ano_escolhido, this.mes_escolhido, this.dia_escolhido)
        .subscribe(
                    result => {
                                this.resultApi = result;
                                let  total_vistorias              = Number.parseInt( this.resultApi.registros[0].total_vistorias );
                                let  vistorias_com_inconfonformes = Number.parseInt( this.resultApi.registros[0].vistorias_com_inconfonformes );
                                               
                                this.pieChart.dataTable = [
                                                            ['Nome', 'Quantidade'],
                                                            ['Vistorias sem inconformes', total_vistorias - vistorias_com_inconfonformes ], 
                                                            ['Vistorias com inconformes', vistorias_com_inconfonformes ] 
                                                          ];

                                //Se não for a primeira vez, então vai atualizar.
                                if(!primeiraExecucao){
                                  this.pieChart.component.draw();
                                }                                                          
                              },
                    erros  => {
                                console.log(erros);
                              } 
                  );
  }


  /**
   * @description: Aiciona as rotinas para poder atualizar os gráficos
   */
  private atualizaGraficos(){


    //Verifica se os checkbox estão selecionados, caso não esteja mando null;
    if(!this.diaSelecionado){
      this.dia_escolhido = null;
    }
    if(!this.mesSelecionado){
      this.mes_escolhido = null;
    }

    this.populaDataTablePieChart();
    this.populaDataTableColumChart();    
  }
}
