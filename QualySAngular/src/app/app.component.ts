// COMPONENTES PADRÕES
import { Router } from '@angular/router';
import { Component } from '@angular/core';
//COMPONENTES PERSONALIZADOS
import { UsuarioService } from './usuario/model/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private title:String   = 'QualyS';

  constructor(private router : Router,
              private usuario:UsuarioService){}


  /**
   * @description: Verifica se o usuário está logado no sistema para poder habilitar o menu de navegação!
   * @returns {boolean} true caso o usuário esteja logado, false caso contrário.
   */
  private isLogado():boolean{
    return this.usuario.getAuth().isAutenticado();
  }


  /**
   * @description Efetua logout da aplicação
   * @param {string} idModal id do modal de logout para poder fecha-lo
   * @obs destrói o token da aplicação
   */
  private logout(idModal:string){
    
    this.fechaConfirmacaoLogout(idModal);
    this.usuario.getAuth().logout();
    this.router.navigate(['login']);
  }


  /**
   * @description: Fecha modal de logout para cancela-lo
   */
  private fechaConfirmacaoLogout(idModal:string){

    $( '#'+ idModal ).modal('hide');
  }

}
