// COMPONENTES PADRÕES
import { Component, OnInit  } from '@angular/core';
import { Subscription       } from 'rxjs';
import { ActivatedRoute     } from '@angular/router';
// COMPONENTES PERSONALIZADOS
import { RespostaFormulario } from '../model/resposta-formulario';
import { ItemFormulario     } from 'src/app/cadastro-formulario/model/item-formulario';
import { CadastroFormularioService } from './../../cadastro-formulario/model/cadastro-formulario.service';


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
  private inconformes   = [];
  
  private mensagemInconfome = null;
  private subTitulo=null;
  private chamaInconforme = false;

// private respostas
 
  private hoje:Date = new Date()
  // private teste = null;
  // private teste:Date;;

  constructor(private route: ActivatedRoute,
              private cadastroFormularioService : CadastroFormularioService
             ) { 
    // this.teste = this.hoje.getDate()+"/"+this.hoje.getUTCMonth()+1+"/"+this.hoje.getFullYear();
    // console.log(this.hoje);
  }


  ngOnInit() {

      let agora = new Date();

      //Recupera o conteudo dos parametros e inicializa campos.
      //Também resgata a instancia da inscrição.
      this.inscricao = this.route.queryParams.subscribe(
        (queryParams: any) => {

          //zerando itens antes de popular.
          this.getRespostaFormulario().clearItens();
          this.inconformes = [];

          this.getRespostaFormulario().setIdCabecalho( queryParams['id'] );
          this.getRespostaFormulario().setDataEmissao( agora.toISOString().substring(0,10) );
          this.getRespostaFormulario().setHoraEmissao( agora.getHours() + ":" + ( agora.getMinutes() <= 9 ? "0"+agora.getMinutes() : agora.getMinutes() ) );
          
          this.populaFormulario();
        }
     );    

  }

  private salvaRespostaFormulario(){
    alert("Salvou resposta formulário!");
    console.log(this.getRespostaFormulario())
  }

  private fechaTela(){
    alert("Fechou tela resposta formulário!")
  }

 
  /**
   * @description: Apresenta tela ( modal ) para usuário descrever inconformidade e o adiciona no array de inconformidade.
   */
  private geraInconforme(item, pergunta):void{

    this.subTitulo= "Pergunta " + item + " - " + pergunta+ " ?";
    this.chamaInconforme = !this.chamaInconforme;
  }

  /**
   * @description: Verifica se item tem inconforme lançado, caso tenha faz a retirada do mesmo do array.
   */
  private retirarInconforme():void{

  }

  /**
   * @description:Checa se tem inconformidade no array de inconformes
   * @return {boolean} true caso houver inconforme no array, false caso contrário.
   */
  private checaExistenciaInconforme():boolean{
    return false;
  }


  private populaFormulario(){

    this.cadastroFormularioService.findFormularioPorId(this.getRespostaFormulario().getIdCabecalho())
                                  .subscribe(

        result => {
                    this.resultadoApi   = result;
                    this.nomeFormulario = this.resultadoApi.registros[0].sigla +" \\ "+ this.resultadoApi.registros[0].descricao;
        
                    for(let registro of this.resultadoApi.registros){

                        this.getRespostaFormulario().addItem ( new ItemFormulario(null, registro.item , registro.pergunta) );
                      }
                      console.log(this.getRespostaFormulario() ) ;
                  },
        error  => {}
    );  
  }


  //pega mensagem do modal e coloca no array
  private confirmaNaoConforme(tst1){

    this.inconformes.push([tst1.subTitulo.substring(0,11) ,tst1.mensagemBox]);
    this.fechaTelaInconformidade();
   console.log(tst1)
  }

  
  fechaTelaInconformidade(){

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
}
