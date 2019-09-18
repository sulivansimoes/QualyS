import { UsuarioService } from './usuario/model/usuario.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private title:String   = 'QualyS';

  constructor(private usuario:UsuarioService){}


  /**
   * @description: Verifica se o usuário está logado no sistema para poder habilitar o menu de navegação!
   * @returns {boolean} true caso o usuário esteja logado, false caso contrário.
   */
  private isLogado():boolean{
    return this.usuario.getAuth().isAutenticado();
  }
}
