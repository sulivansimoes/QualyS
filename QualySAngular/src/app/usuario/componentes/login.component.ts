// COMPONENTES PADRÕES
import { Component, OnInit } from '@angular/core';
import { Router            } from '@angular/router';
// COMPONENTES PERSONALIZADOS
import { UsuarioService    } from './../model/usuario.service';
import { navigateMenu      } from 'src/app/global/funcoes/functionsComuns';

@Component({
  selector: 'login',
  templateUrl: './../view/login.component.html',
  styleUrls: [
      './../view/login.component.css',
      './../../global/view/icones.css'
    ]
})

export class LoginComponent implements OnInit {

  private user:String  = "";
  private senha:String = "";
  private erro:String  = null;

  constructor(private usuario:UsuarioService,
              private router: Router) { }

  ngOnInit() {  }


  /**
   * @description: adiciona caracteres pertencentes a mascara do cpf, de forma automatica.
   * @param {String} cpf - número do cpf 
   */
  private formataCpf(cpf:any){
 
    if( isNaN( cpf.charAt(cpf.length-1) )  ){        
      // retira caracter se não for número
      this.user = this.user.substring(0, this.user.length-1);    
    }else{
      switch(cpf.length){
        case 3 : case 7 :
          this.user += "."
        break;
        case 11 :
          this.user +="-"
        break;
      }
    }
    this.erro = null;
  }


  /**
   * @description Envia solicitação de login para o serviçe
   */
  private login(){

    let cpf:String;
    let resultApi = null;

    //retira os caracteres especiais
    cpf = this.user.substring(0,3) 
        + this.user.substring(4,7)
        + this.user.substring(8,11) 
        + this.user.substring(12,14);

    this.usuario.getAuth().login(cpf, this.senha)
                          .subscribe(
                                        result =>{ 
                                                    this.erro = null;
                                                    resultApi = result;

                                                    if(resultApi.auth){

                                                      console.log("usuario "+cpf+" logado");
                                                      this.usuario.getAuth().salvaToken(resultApi.token);
              
                                                      navigateMenu(this.usuario.getAuth().decodificaToken().perfil, this.router);
                                                    }
                                                  },
                                        erros => { 
                                                    this.erro = erros;
                                                  }
                                      );
    
  }
}
