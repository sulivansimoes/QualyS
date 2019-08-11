// COMPONENTES PADRÕES
import { Router            } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription      } from 'rxjs';
// COMPONENTES PERSONALIZADOS
import { CadastroFormulario        } from './../../cadastro-formulario/model/cadastro-formulario';
import { CadastroFormularioService } from './../../cadastro-formulario/model/cadastro-formulario.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './../view/nav-bar.component.html',
  styleUrls: [
    './../view/nav-bar.component.css'
  ]
})
export class NavBarComponent implements OnInit {

  private inscricao    = new Subscription;
  private formularios:CadastroFormulario[] = [];
  private resultadoApi = null;
  private errosApi
  
  static countErros = 1;

  constructor( private router: Router,
               private cadadastroFormularioService: CadastroFormularioService
              ) { 

  }

  ngOnInit() {

    //#################################################################################
    //# BLOCO RESPONSAVEL POR GERENCIAR/FORNECER O DROPDOW ANINHADO
    //# USA CLASSES DE nav-bar.css
    //#################################################################################
    $('.dropdown-menu a.dropdown-toggle').on('click', function (e) {
      if (!$(this).next().hasClass('show')) {
        $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
      }
      var $subMenu = $(this).next(".dropdown-menu");
      $subMenu.toggleClass('show');

      $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
        $('.dropdown-submenu .show').removeClass("show");
      });
      return false;
    });


    //#################################################################################
    //# RECUPERA FORMULÁRIOS DO BANCO DE DADOS.
    //#################################################################################
    this.getAllFormularios();
  }


  /**
   * destruo a inscrição ao fechar.
   */
  ngOnDestroy(){
    
    this.inscricao.unsubscribe();
  }


 /**
  * @description Método responsável por alterar qual modal de ajuda será chamado quando o botão 'Ajuda' for clicado.
  */
  private alternaAjuda(): void {

    switch (this.router.url.split("?")[0] ) {

      case "/browser-local" : case "/browser-local/local" :      

        $("#modalAjudaCadastroLocal").modal();        
        console.log("Modal ajuda local");
      break;
      case "/browser-frequencia" :  case "/browser-frequencia/frequencia" :

        $("#modalAjudaCadastroFrequencia").modal();        
        console.log("Modal ajuda frequencia");
      break;
      case "/browser-programa" : case "/browser-programa/programa" :
      
        $("#modalAjudaCadastroPrograma").modal();   
        console.log("Modal ajuda programa");
      break;
      case "/browser-cadastro-formulario" : case "/browser-cadastro-formulario/cadastro-formulario" :
      
        $("#modalAjudaCadastroFormulario").modal();   
        console.log("Modal ajuda formulário");
      break;
      case "/browser-usuario" : case "/browser-usuario/usuario" :

        $("#modalAjudaCadastroUsuario").modal();   
        console.log("Modal ajuda usuário");
      break;
      case "/browser-inconforme": case "/browser-inconforme/inconforme":
      
        $("#modalAjudaCadastroInconformes").modal();   
        console.log("Modal ajuda inconformes");
      break;
      case  "/resposta-formulario":
        
        $("#modalAjudaCadastroRespostaFormulario").modal();   
        console.log("Modal ajuda resposta formulário");
      break;
      case "/" :

        $("#modalAjudaMenuPrincial").modal();   
        console.log("Modal ajuda menu principal");
      break;
      default :
        console.log("[botão 'Ajuda' clicado]: Ajuda para rota: "+this.router.url+" não encontrada.");
      break;
    }
  }


  /**
   * @description Envia solicitação ao service para pegar todos formulários cadastrados
   */
  private getAllFormularios(){

    this.inscricao = this.cadadastroFormularioService.getAllCabecalhoFormularios().subscribe(
        
        result => {
                    this.resultadoApi = result;
                    this.formularios  = this.resultadoApi.registros;   
                  },
        error => {
                    this.setErrosApi(error);
                 }
    );
  }


 /**
   * @description função seta conteudo da variavel erroApi, ela faz uso da varivel estática [ ela incrementa a countErros]
   *              para que a mensagem sempre seja alterada e assim ouvida pelo ngOnChanges da tela-erros
   * @param error error ocasionado na aplicação. 
   */
  setErrosApi(error){

    this.errosApi = error + " /countErros: " + NavBarComponent.countErros++  ;
    console.log(this.errosApi);
  }  


}
