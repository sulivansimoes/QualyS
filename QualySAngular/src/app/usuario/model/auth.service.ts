// MÓDULOS PADRÕES
import { Injectable  } from '@angular/core';
import { catchError  } from 'rxjs/operators';
import { Observable  , throwError        } from 'rxjs';
import { HttpHeaders , HttpErrorResponse , HttpClient } from '@angular/common/http';
// MÓDULOS PERSONALIZADOS
import { host, port } from './../../rootHost';
import { Usuario    } from './usuario';
// MÓDULOS DE TERCEIROS 
import { JwtHelperService } from '@auth0/angular-jwt';

const KEY = '#QualySToken';
const jwtHelper = new JwtHelperService();

const httpOption = {
  headers: new HttpHeaders({"Content-Type":"application/json"}),
}


/**
 * @description Classe fornece os métodos responsáveis pela autenticação.
 * @obs Essa classe DEVE ser acessada APENAS por intermédio da classe Usuário e NUNCA acessada diretamente.             
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginApi : string = host+port+"/api/login"

  constructor(private http : HttpClient) { }


  /**
   * @description Submete os dados do usuário para o login. 
   * @param cpf cpf do usuário que está tentando efetuar o login
   * @param senha senha do usuário que está tentando efetuar o login
   */
  public login(cpf:String, senha:String) : Observable<Usuario>{

    return this.http.post<Usuario>(this.loginApi, {cpf, senha} , httpOption)
                    .pipe(
                            catchError(
                                        this.errorHandler
                                      )
                          ); 
  } 
  
  
  /**
   * @description: Destrói o token do usuário do localstorage
   */
  public logout(){

    window.localStorage.removeItem(KEY);
  }


  /**
   * @description: Salva o token oriundo do back-end, no localstorage
   */
  public salvaToken(token:string){
    
    window.localStorage.setItem(KEY, token);
  }



  /**
   * @description: Verifica se o token expirou
   * @returns true caso não tenha expirado, false caso contrário.
   * @see https://github.com/auth0/angular2-jwt
   * @see https://www.npmjs.com/package/@auth0/angular-jwt
   */
  public isAutenticado(): boolean {    
   
    return !jwtHelper.isTokenExpired(this.getToken());
  }


  /**
   * @description Decodifica o token salvo no localstorage e o torna legivel em um JSON caso ele estiver válido!
   * @returns {any} retorna o JSON com as informações do token caso o mesmo seja válido, null caso contrário
   * @see https://github.com/auth0/angular2-jwt
   * @see https://www.npmjs.com/package/@auth0/angular-jwt
   */
  public decodificaToken():any{

    console.log(jwtHelper.decodeToken(this.getToken()));    
    return ( this.isAutenticado() ) ? jwtHelper.decodeToken(this.getToken()) : null;
  }


  /**
   * @description Retorna o token salvo no localstorage independente de estar válido ou não.
   * @returns {string} token salvo no localstorage
   */
  public getToken():string{
    return window.localStorage.getItem(KEY);
  }


  /**
    * @description Função intercepta e lança erros originados ao tentar fazer solicitações à API.
    * @param error erros gerados ao fazer solicitações à API
    * @returns retorna uma string contendo o erro que acontenceu. 
    */
  private errorHandler(error : HttpErrorResponse){

    return throwError( error.error.mensagem || "Servidor com Erro! "+ error.message);
  } 

}
