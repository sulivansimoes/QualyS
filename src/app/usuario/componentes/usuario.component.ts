// COMPONTENTES PADRÕES
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// COMPONENTES PERSONALIZADOS
import { Usuario } from './../model/usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './../view/usuario.component.html',
  styleUrls: [
    './../view/usuario.component.css',
    './../../global/view/estilo-global-crud.css',
  ]
})
export class UsuarioComponent implements OnInit {

   //TAMANHO MAXIMO DE CAMPOS
  private SIZE_CPF    = 11;
  private SIZE_NOME   = 50;
  private SIZE_EMAIL  = 60;
  private SIZE_SENHA  = 10;

  private usuario:Usuario = new Usuario();
  private confirmaSenha:string;
  

  constructor(private router:Router) {

  }

  ngOnInit() {
  }

  /**
   * @description: fecha tela de inclusão e volta para a tela de browser.
   * */
  private fechaTela(){
   
    if(window.confirm("Se fechar as informações serão perdidas, deseja realmente fechar ? ")){
      this.router.navigateByUrl("browser-usuario");
    }
  }

}
