//COMPONENTES PADRÕES
import { Component, OnInit } from '@angular/core';
import { Subscription      } from 'rxjs';
//COMPONENTES PERSONALIZADOS
import { Usuario           } from './../model/usuario';
import { UsuarioService    } from './../model/usuario.service';


@Component({
  selector: 'app-browser-usuario',
  templateUrl: './../view/browser-usuario.component.html',
  styleUrls: [
    './../view/browser-usuario.component.css',
    './../../global/view/estilo-global-crud.css',
    './../../global/view/icones.css'
  ]
})
export class BrowserUsuarioComponent implements OnInit {

  public inscricao     = new Subscription;
  public resultadoApi  = null;
  public errosApi      = null;
  public paginaAtual   = 1;     // Dizemos que queremos que o componente quando carregar, inicialize na página 1.
  public usuarios:Usuario[] = []; 
  public pesquisa:String = "";

  static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere

  constructor(private usuarioService : UsuarioService ) { 

    this.getAll();
  }


  ngOnInit() { }


  /**
   * destruo a inscrição ao fechar.
   */
  ngOnDestroy(){
    
    this.inscricao.unsubscribe();
  }  


  /**
   * @description: Se inscreve no serviço que envia solicitação para API resgatar todos usuarios na base de dados.
   */
  getAll(){

    this.inscricao = this.usuarioService.getAllUsuarios().subscribe(

        result => {
                    this.resultadoApi = result;
                    this.usuarios  = this.resultadoApi.registros;        
                  },
        error => {
                    this.setErrosApi(error);
                 }
    );
  } 


   /**
   * @description: Se inscreve no serviço que envia solicitação para API resgatar todas usuarios 
   *               pela descricao na base de dados.
   */  
  getUsuariosPorNome(){

    if(this.pesquisa.trim() == ""){

        this.getAll();
    }else{

        this.usuarioService.getUsuariosPorNome(this.pesquisa).subscribe(

                result => {
                            this.resultadoApi = result;
                            this.usuarios     = this.resultadoApi.registros;        
                          },
                error => {
                            this.setErrosApi(error);
                         }
        );
    }
  } 


  /**
   * @description: Se inscreve no serviço que envia solicitação para API excluir usuario na base de dados.
   * @param usuario, usuarios à ser salva na base de dados.
   */
  excluiUsuario(usuario : Usuario){

    this.inscricao = this.usuarioService.deletaUsuario(usuario).subscribe(

      result => {
                  this.getAll();
                },
      error => {
                  this.setErrosApi(error);
               }
    );
  } 
  
  
  /**
   * @description função seta conteudo da variavel erroApi, ela faz uso da varivel estática [ ela incrementa a countErros]
   *              para que a mensagem sempre seja alterada e assim ouvida pelo ngOnChanges da tela-mensagem
   * @param error error ocasionado na aplicação. 
   */
  setErrosApi(error){

    this.errosApi = error + " /countErros: " + BrowserUsuarioComponent.countErros++  ;
    console.log(this.errosApi);
  }  
}
