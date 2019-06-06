import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './../view/login.component.html',
  styleUrls: [
      './../view/login.component.css',
      './../../global/view/icones.css'
    ]
})
export class LoginComponent implements OnInit {

  private user:String = "";
  private senha:String = "";

  constructor() { }

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
  }
}
