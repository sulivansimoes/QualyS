// COMPONENTES PADRÕES
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './../view/nav-bar.component.html',
  styleUrls: [
    './../view/nav-bar.component.css'
  ]
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    //#################################################################################
    //# BLOCO RESPONSAVEL POR GERENCIAR/FORNECER O DROPDOW ANINHADO
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
  }

 /**
  * @description Método responsável por alterar qual modal de ajuda será chamado quando o botão 'Ajuda' for clicado.
  */
  private alternaAjuda(): void {

    switch (this.router.url) {

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
      default :
        console.log("[botão 'Ajuda' clicado]: Ajuda para rota: "+this.router.url+" não encontrada.");
      break;
    }
  }

}
