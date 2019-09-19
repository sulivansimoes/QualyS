// COMPONENTES PADRÕES
import { Injectable              } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { catchError              } from 'rxjs/operators';
import { Observable ,throwError  } from 'rxjs';
// COMPONENTES PERSONALIZADOS
import { Usuario                 } from './usuario';
import { host, port              } from './../../rootHost';
import { AuthService             } from './auth.service';

const httpOption = {
  headers: new HttpHeaders({"Content-Type":"application/json"}),
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarioApi : string = host+port+"/api/usuario";
  private auth:AuthService    = null;

  constructor(private http : HttpClient) {

    httpOption.headers =  httpOption.headers.set("x-access-token", this.getAuth().getToken() );
  }


  /**
   * @description Retorna a classe de autorização do usuário.
   * @returns {AuthService} instância do AuthService do usuário em questão
   */
  public getAuth():AuthService{

    if(this.auth == null){
      this.auth = new AuthService(this.http);
    }
    return this.auth;
  }


  /**
   * @description retorna usuário logado de acordo com informações do token
   */
  public getUsuario(){
    return this.getAuth().decodificaToken();
  }
  

  /**
    * @description envia solicitação para API salvar usuario na base de dados.
    * @param usuario objeto da usuario que deve ser salva.
    * @returns Observable 
    */
  public salvaUsuario(usuario : Usuario) : Observable<Usuario> {
 
      return this.http.post<Usuario>(this.usuarioApi, usuario, httpOption)
                      .pipe(
                              catchError(
                                          this.errorHandler
                                        )
                            ); 
  } 


  /**
    * @description envia solicitação para API atualizar usuario na base de dados.
    * @param usuario objeto da usuario que deve ser atualizada.
    * @returns Observable
    */
  public atualizaUsuario(usuario : Usuario): Observable<Usuario>{
  
      return this.http.put<Usuario>(this.usuarioApi, usuario, httpOption)
                      .pipe(
                              catchError(
                                          this.errorHandler
                                        )
                            );    
  }
  

  /**
    * @description envia solicitação para API deletar usuario da base de dados.
    * @param cpfUsuario cpf do usuario que deve ser deletada
    * @returns Observable
    */
  public deletaUsuario(cpfUsuario : String) {

      return this.http.delete<Usuario>( this.usuarioApi + "/" + cpfUsuario, httpOption )
                      .pipe(
                              catchError(
                                          this.errorHandler
                                        )
                            );
  } 


  /**
    * @description envia solicitação para API consultar todas as Usuarios cadastradas 
    *              na base de dados.
    */
  public getAllUsuarios() : Observable<Usuario[]>{

      return this.http.get<Usuario[]>(this.usuarioApi, httpOption)
                      .pipe(
                              catchError(
                                          this.errorHandler
                                        )
                            );
  } 


  /**
    * @description envia solicitação para API consultar as usuarios pelo nome.
    * @param nome, nome dos usuarios a serem localizadas. 
    * @returns Observable
    */
  public getUsuariosPorNome(nome:String) : Observable<Usuario[]>{

      return this.http.get<Usuario[]>(this.usuarioApi + "/" + nome, httpOption )
                      .pipe(
                              catchError(
                                          this.errorHandler
                                        )
                            );
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
