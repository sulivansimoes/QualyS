// COMPONETES PADRÕES
import { Component, OnInit   } from '@angular/core';
import { Router              } from '@angular/router';
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

  private frequencia:Frequencia   = null;
  private frequecias:Frequencia[] = [];

  constructor(private router:Router, private frequenciaService:FrequenciaService ) {
   //constructor(private router:Router, private frequenciaService:FrequenciaService ) { 
    this.frequencia = new Frequencia();
    // this.frequencia = 
  }
  

  ngOnInit() { }
  

  /**
   * @description Se inscreve no serviço que envia solicitação para API salvar frequência na base de dados.
   */
  private salvaFrequencia(){
   
    this.frequenciaService.salvaFrequencia(this.frequencia).subscribe( values => alert("deu certo"));
    this.frequencia = new Frequencia();
  }

  private deletaFrequencia(){
    
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