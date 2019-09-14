// COMPONENTES PADRÕES
import { Subscription           } from 'rxjs';
import { Component, OnInit      } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// COMPONENTES PERSONALIZADOS
import { Inconforme             } from '../model/inconforme';
import { InconformeService      } from './../model/inconforme.service';
import { msgConfirmaCancelamento } from 'src/app/global/funcoes/mensagensPadroes';

@Component({
  selector: 'app-inconforme',
  templateUrl: './../view/incoforme.component.html',
  styleUrls: [
    './../view/incoforme.component.css',
    './../../global/view/estilo-global-crud.css',
    './../../global/view/icones.css'
  ]
})
export class InconformeComponent implements OnInit {

  private inconforme:Inconforme= null;
  private inscricao = new Subscription;
  private errosApi  = null;
  private edita     = null; //flag de alteração.
  // Variaveis usadas no modal de cancelamento
  private mensagemCancelamento    = msgConfirmaCancelamento;
  private cancela                 = false; 
  private idModal                 = "idCancelainconforme"  
  static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere

  constructor(private router:Router,
              private route: ActivatedRoute,
              private inconformeService: InconformeService ) { }



  ngOnInit() {

      //Recupera o conteudo dos parametros e inicializa campos.
      //Também resgata a instancia da inscrição.
      this.inscricao = this.route.queryParams.subscribe(
        (queryParams: any) => {

          this.getInconforme().setIdFormulario( queryParams['id'] );
          this.getInconforme().setItem( queryParams['item'] );
          this.getInconforme().setPergunta( queryParams['pergunta'] );
          this.getInconforme().setHoraEmissao( queryParams['horaEmissao'] );
          this.getInconforme().setAcaoCorretiva( queryParams['acaoCorretiva'] );
          this.getInconforme().setDescricaoInconforme( queryParams['inconforme'] );
          this.getInconforme().setDescricaoFormulario( queryParams['descricaoFormulario'] );
          this.getInconforme().setDataEmissao( queryParams['dataEmissao'].substring(0,10) );

          //Verifico se parametro não está null
          if( queryParams['dataCorrecao'] ){

            this.getInconforme().setDataCorrecao( queryParams['dataCorrecao'].substring(0,10) );
          }

          //Se já foi corrigo, desabilito campos.
          this.edita = this.getInconforme().getDataCorrecao() && 
                       this.getInconforme().getAcaoCorretiva() ? true : false;
        }
     );
  }

  
  /**
   * Destruo a inscrição ao finalizar
   */
  ngOnDestroy(){

    this.inscricao.unsubscribe();
  } 


  /**
   * @description: Envia solicitação para o service salvar a correção do inconforme.
   */
  corrigeInconforme(){

    this.inscricao = this.inconformeService.corrigeInconforme(this.getInconforme())
                                           .subscribe( 
                                                        result =>{ 
                                                                    this.fechaTela();
                                                                  },
                                                        erros => { 
                                                                    this.setErrosApi(erros);
                                                                  }
                                                      );      
  }


  /**
   * @description: Aciona modal para confirmar cancelamento
   * */
  private botaoCancelaClicado(){
    this.cancela = !this.cancela;
  }


  /**
   * @description: Fecha modal e Volta para a tela do browser
   */
  private fechaTela(){

    this.fechaModalCancelar();
    this.router.navigateByUrl("browser-inconforme");
  }
  

  /**
   * @description: Fecha modal de cancelamento
   */
  private fechaModalCancelar(){

    $( '#'+this.idModal ).modal('hide');
  }


  /**
   * @description função seta conteudo da variavel erroApi, ela faz uso da varivel estática [ ela incrementa a countErros]
   *              para que a mensagem sempre seja alterada e assim ouvida pelo ngOnChanges da tela-erros
   * @param error error ocasionado na aplicação. 
   */
  setErrosApi(error){

    this.errosApi = error + " /countErros: " + InconformeComponent.countErros++  ;
    console.log(this.errosApi);
  }  


  /**
   * @description: retorna uma instancia de inconforme alocada em memória.
   * @return {Inconforme} ( inconforme ) - instancia alocada em memória
   */
  getInconforme():Inconforme{

    if(this.inconforme == null){
      this.inconforme = new Inconforme();
    }
    return this.inconforme;
  }

}
