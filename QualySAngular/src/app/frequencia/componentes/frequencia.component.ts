// COMPONETES PADRÕES
import { Component, OnInit      } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription           } from 'rxjs';

// COMPONENTES PERSONALIZDOS
import { Frequencia          } from './../model/frequencia';
import { FrequenciaService   } from './../model/frequencia.service';

@Component({
  selector: 'app-frequencia',
  templateUrl: './../view/frequencia.component.html',
  styleUrls: [
    './../view/frequencia.component.css',
    './../../global/view/estilo-global-crud.css',
  ]
})
export class FrequenciaComponent implements OnInit {
    
  //TAMANHO DOS CAMPOS 
  private SIZE_ID        = 4;
  private SIZE_DESCRICAO = 15;

  private inscricao               = new Subscription;
  private frequencia:Frequencia   = null;

  constructor( private router:Router , 
               private frequenciaService:FrequenciaService,
               private route: ActivatedRoute ) {
      
      this.frequencia = new Frequencia();
  }
  

  ngOnInit() { 
    
      //Recupera o conteudo dos parametros e inicializa campos.
      //Também resgata a instancia da inscrição.
      this.inscricao = this.route.queryParams.subscribe(
                          (queryParams: any) => {

                            this.frequencia.id        = queryParams['id'];
                            this.frequencia.descricao = queryParams['descricao'];
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
   * @description Se inscreve no serviço que envia solicitação para API salvar frequência na base de dados.
   */
  private salvaFrequencia(){
   
    this.frequenciaService.salvaFrequencia(this.frequencia).subscribe( values => alert("deu certo"));
    this.frequencia = new Frequencia();
  }


  /**
   * @description: fecha tela de inclusão e volta para a tela de browser.
   * */
  private fechaTela(){
   
    if(window.confirm("Se fechar as informações serão perdidas, deseja realmente fechar ? ")){
      this.router.navigateByUrl("browser-frequencia");
    }
  }

}