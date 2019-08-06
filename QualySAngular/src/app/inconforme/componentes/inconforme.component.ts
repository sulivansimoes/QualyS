// COMPONENTES PADRÕES
import { Subscription           } from 'rxjs';
import { Component, OnInit      } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// COMPONENTES PERSONALIZADOS
import { Inconforme } from '../model/inconforme';

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
  
  constructor(private router:Router,
              private route: ActivatedRoute ) { }



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
          this.getInconforme().setDataCorrecao( queryParams['dataCorrecao'].substring(0,10) );
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
   * @description: Envia solicitação para o service corrigir o inconforme.
   */
  private corrigeInconforme(){

      
  }


  /**
   * @description: fecha tela de inconforme e volta para a tela de browser.
   * */
  private fechaTela(){
   
    if(window.confirm("As informações não foram salvas, deseja realmente cancelar?")){
      this.router.navigateByUrl("browser-inconforme");
    }
  }  

  /**
   * @description: retorna uma instancia de inconforme alocada em memória.
   * @return {Inconforme} ( inconforme ) - instancia alocada em memória
   */
  private getInconforme():Inconforme{

    if(this.inconforme == null){
      this.inconforme = new Inconforme();
    }
    return this.inconforme;
  }

}
