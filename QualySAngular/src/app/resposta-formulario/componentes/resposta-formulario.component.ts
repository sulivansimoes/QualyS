// COMPONENTES PADRÕES
import { Component, OnInit  } from '@angular/core';
import { Subscription       } from 'rxjs';
import { ActivatedRoute, Router    } from '@angular/router';
// COMPONENTES PERSONALIZADOS
import { RespostaFormulario } from '../model/resposta-formulario';
import { ItemFormulario     } from 'src/app/cadastro-formulario/model/item-formulario';
import { RespostaFormularioService } from './../model/resposta-formulario.service';
import { CadastroFormularioService } from './../../cadastro-formulario/model/cadastro-formulario.service';
import { msgConfirmaCancelamento   } from 'src/app/global/funcoes/mensagensPadroes';

@Component({
  selector: 'app-resposta-formulario',
  templateUrl: './../view/resposta-formulario.component.html',
  styleUrls: [
    './../view/resposta-formulario.component.css',
    './../../global/view/estilo-global-crud.css',
    './../../global/view/icones.css'
  ]
})
export class RespostaFormularioComponent implements OnInit {

  private inscricao     = new Subscription;
  private resultadoApi  = null;
  private errosApi      = null;
  private respostaFormulario:RespostaFormulario = null;
  private nomeFormulario:String = "";
  private mensagemInconfome = null;
  private subTitulo       = null;
  private chamaInconforme = false;
  private cancelaRespota  = false;
  private mensagemCancelamento  = msgConfirmaCancelamento;
  private idModal         = "idMsgCancelaResposta";

  static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere
 
  constructor(private route: ActivatedRoute,
              private router:Router,
              private cadastroFormularioService : CadastroFormularioService,
              private respostaFormularioService : RespostaFormularioService) { 
  }


  ngOnInit() {

    
    /***
     * @todo
     * esse trecho é provisório até implementar o LOGIN corretamente.
     */
    this.getRespostaFormulario().setCpfUsuario("42687294618");
    
    //Recupera o conteudo dos parametros e inicializa campos.
    //Também resgata a instancia da inscrição.
    this.inscricao = this.route.queryParams.subscribe(
      (queryParams: any) => {
        
          //zerando itens antes de popular.
          let agora = new Date();
          this.getRespostaFormulario().clearItens();
          this.getRespostaFormulario().inconformes = [];

          //Montando formulário para responde-lo
          this.getRespostaFormulario().setIdCabecalho( Number.parseInt(queryParams['id']) );
          this.getRespostaFormulario().setDataEmissao( agora.toISOString().substring(0,10) );
          this.getRespostaFormulario().setHoraEmissao( agora.getHours() + ":" + ( agora.getMinutes() <= 9 ? "0"+agora.getMinutes() : agora.getMinutes() ) );
          
          this.populaFormulario();
        }
     );    

  }


  /**
   * @description: Envia soliciatação para o service salvar as respostas do formulário.
   */
  private salvaRespostaFormulario(){

    this.respostaFormularioService.salvaRespostaFormulario(this.getRespostaFormulario())
                                  .subscribe( 
                                              result =>{ 
                                                          alert("deu certo salvamento");
                                                          this.fechaTela();
                                                        },
                                              erros => { 
                                                          this.setErrosApi(erros);
                                                        }
                                            );
   
 }


  /**
   * @description: Fecha a tela da resposta do formulário e volta para tela inicial. 
   */
  private fechaTela(){
    this.fechaModalCancelar();
    this.router.navigateByUrl("/");
  }

  
  /**
   * @description: Fecha o modal de cancelamento
   */
  private fechaModalCancelar(){
    
    $( '#'+this.idModal ).modal('hide');
  }


  /**
   * @description aciona o modal para confirmar o cancelamento
   */
  private confirmaCancelamento(){
    this.cancelaRespota = !this.cancelaRespota;
  }

  /**
   * @description: Popula formulario com suas respectivas pergutas, o qual o usuario deverá responde-lo.
   * @obs : não considera perguntas bloqueadas.
   */
  private populaFormulario(){

    this.cadastroFormularioService.findFormularioPorId(this.getRespostaFormulario().getIdCabecalho())
                                  .subscribe(

        result => {
                    this.resultadoApi   = result;
                    this.nomeFormulario = this.resultadoApi.registros[0].sigla +" \\ "+ this.resultadoApi.registros[0].descricao;
        
                    for(let registro of this.resultadoApi.registros){

                        this.getRespostaFormulario().addItem ( new ItemFormulario(null, registro.item , registro.pergunta) );
                      }
                  },
        error  => {
                    this.setErrosApi(error);
                  }
    );  
  }


  /**
   * @description: Apresenta tela ( modal ) para usuário descrever inconformidade e o adiciona no array de inconformidade.
   * @param {String}  item - código do item que será gerada a não conformidade
   * @param {String}  pergunta - pergunta que será gerada a não conformidade
   */
  private geraInconforme(item:String, pergunta:String):void{

    this.subTitulo         = "Pergunta " + item + " - " + pergunta+ " ?";
    this.mensagemInconfome = null;
    this.chamaInconforme   = !this.chamaInconforme;
  }


  /**
   * @description Pega subtitulo e mensagem do não conforme do componente tela-box e adiciona no array de não conformes.
   * @param {Object} naoconfome objeto oriundo do compomente tela-box
   */
  private confirmaNaoConforme(naoconfome:any){

    //Em casos de edição, eu retiro o inconforme antigo do array antes de incluir o alterado.
    this.retirarInconforme(Number.parseInt( naoconfome.subTitulo.substring(8,11).trim() ) );

    //Inclui inconforme
    this.getRespostaFormulario().inconformes.push({
                                                    "item": Number.parseInt(naoconfome.subTitulo.substring(8,11).trim()) ,
                                                    "descricao_inconforme": naoconfome.mensagemBox                       , 
                                                    "pergunta": naoconfome.subTitulo.substring(13).trim()    
                                                  });
    this.fechaTelaInconformidade();
  }


  /**
   * @description: Verifica se item tem inconforme lançado, caso tenha faz a retirada do mesmo do array de não conformes.
   * @param item  - código do item do inconforme.
   */
  private retirarInconforme(item:number):void{

    let index = 0;
    for( let inconforme of this.getRespostaFormulario().inconformes ){

      //Localiza inconformidade no array
      if( inconforme.item == item){

        //Se achou inconformidade então retira.
        this.getRespostaFormulario().inconformes.splice(index, 1);
        break;
      }
      index++;
    }
  }


  /**
   * @description: Abre o modal com o incormode que já foi lançado para que o mesmo possa ser editado.
   * @param {Any} inconforme - objeto do inconforme lançado.
   */
  private editaInconforme(inconforme:any):void{
      
      let item        = inconforme.item;
      let pergunta    = inconforme.pergunta;
      let naoConforme = inconforme.descricao_inconforme;

      this.subTitulo         = "Pergunta " + item + " - " + pergunta;
      this.mensagemInconfome = naoConforme;
      this.chamaInconforme   = !this.chamaInconforme;
  }
  

  /**
   * @description: Fecha tela (modal) de não conformidade
   */
  private fechaTelaInconformidade(){

    $('#modalTelaBox').modal('hide');
  }


  /**
   * @description: retorna uma instancia de inconforme alocada na memória.
   * @return {RespostaFormulario} inconforme - instancia do inconforme instanciada.
   */
  private getRespostaFormulario() : RespostaFormulario{
    
    if(this.respostaFormulario == null){

      this.respostaFormulario = new RespostaFormulario();
    }
    return this.respostaFormulario;
  }


  /**
   * @description função seta conteudo da variavel erroApi, ela faz uso da varivel estática [ ela incrementa a countErros]
   *              para que a mensagem sempre seja alterada e assim ouvida pelo ngOnChanges da tela-erros
   * @param error error ocasionado na aplicação. 
   */
  private setErrosApi(error){

    this.errosApi = error + " /countErros: " + RespostaFormularioComponent.countErros++  ;
    console.log(this.errosApi);
  }
}
